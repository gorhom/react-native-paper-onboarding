import React, {
  useMemo,
  useRef,
  useCallback,
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Dimensions,
  Insets,
  LayoutChangeEvent,
  I18nManager,
} from 'react-native';
import { usePanGestureHandler, useValue } from 'react-native-redash';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  add,
  useCode,
  onChange,
  call,
} from 'react-native-reanimated';
import Background from './components/background';
import Page from './components/page';
import IndicatorsContainer from './components/indicatorsContainer';
import CloseButton from './components/closeButton';
import { useTiming } from './useTiming';
import {
  DEFAULT_SAFE_INSET,
  DEFAULT_DIRECTION,
  DEFAULT_INDICATOR_SIZE,
  DEFAULT_INDICATOR_BORDER_COLOR,
  DEFAULT_INDICATOR_BACKGROUND_COLOR,
  DEFAULT_CLOSE_BUTTON_TEXT,
  DEFAULT_CLOSE_BUTTON_CALLBACK,
} from './constants';
import { styles } from './styles';
import type {
  PaperOnboardingProps,
  PaperOnboardingMethods,
  PaperOnboardingScreenDimensions,
} from './types';

// @ts-ignore
Animated.addWhitelistedUIProps({
  cx: true,
  cy: true,
  r: true,
  fillOpacity: true,
  pointerEvents: true,
});

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2,
} = require('react-native-reanimated');
const interpolate = interpolateV2 || interpolateV1;

type PaperOnboarding = PaperOnboardingMethods;

const PaperOnboardingComponent = forwardRef<
  PaperOnboarding,
  PaperOnboardingProps
>(
  (
    {
      data,
      safeInsets: _safeInsets,
      direction = DEFAULT_DIRECTION,
      // indicator config
      indicatorSize = DEFAULT_INDICATOR_SIZE,
      indicatorBackgroundColor = DEFAULT_INDICATOR_BACKGROUND_COLOR,
      indicatorBorderColor = DEFAULT_INDICATOR_BORDER_COLOR,
      // override styles
      titleStyle,
      descriptionStyle,
      // close button config
      closeButton,
      closeButtonTextStyle,
      closeButtonText = DEFAULT_CLOSE_BUTTON_TEXT,
      onCloseButtonPress = DEFAULT_CLOSE_BUTTON_CALLBACK,
      onIndexChange,
    },
    ref
  ) => {
    // state
    const [dimensions, setDimensions] =
      useState<PaperOnboardingScreenDimensions>({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      });

    // refs
    const indexRef = useRef<number>(0);
    const pagesRef = useRef<Array<Animated.View | null>>(data.map(() => null));

    //#region variables
    const safeInsets = useMemo<Required<Insets>>(() => {
      return {
        top: _safeInsets?.top ?? DEFAULT_SAFE_INSET,
        bottom: _safeInsets?.bottom ?? DEFAULT_SAFE_INSET,
        left: _safeInsets?.left ?? DEFAULT_SAFE_INSET,
        right: _safeInsets?.right ?? DEFAULT_SAFE_INSET,
      };
    }, [_safeInsets]);
    const indicatorsContainerLeftPadding = useMemo(() => {
      const containerLeftPadding = dimensions.width / 2 - indicatorSize / 2;
      return I18nManager.isRTL
        ? -containerLeftPadding + indicatorSize * (data.length - 1)
        : containerLeftPadding;
    }, [dimensions.width, indicatorSize, data.length]);
    //#endregion

    //#region animated variables
    const { gestureHandler, state, translation, velocity } =
      usePanGestureHandler();
    const animatedStaticIndex = useValue<number>(0);
    const animatedOverrideIndex = useValue<number>(0);
    const animatedIndex = useTiming({
      animatedStaticIndex,
      animatedOverrideIndex,
      value: direction === 'horizontal' ? translation.x : translation.y,
      velocity: direction === 'horizontal' ? velocity.x : velocity.y,
      state: state,
      size: data.length,
      screenWidth: dimensions.width,
    });
    const animatedIndicatorsContainerPosition = useMemo(() => {
      const indicatorsContainerPosition = data.map(
        (_, index) => index * indicatorSize * -1
      );

      return add(
        interpolate(animatedIndex, {
          inputRange: data.map((_, index) => index),
          outputRange: I18nManager.isRTL
            ? indicatorsContainerPosition.reverse()
            : indicatorsContainerPosition,
          extrapolate: Animated.Extrapolate.CLAMP,
        }),
        indicatorsContainerLeftPadding
      );
    }, [data, animatedIndex, indicatorSize, indicatorsContainerLeftPadding]);
    //#endregion

    //#region callbacks
    const handlePageRef = useCallback((pageRef, index) => {
      pagesRef.current[index] = pageRef;
    }, []);

    const handleOnLayout = useCallback(
      ({
        nativeEvent: {
          layout: { width, height },
        },
      }: LayoutChangeEvent) => {
        setDimensions({
          width,
          height,
        });
      },
      []
    );
    //#endregion

    //#region public methods
    const handleNavigateToNextPage = useCallback(() => {
      const currentIndex = indexRef.current;
      if (currentIndex === data.length - 1) {
        return;
      }
      animatedOverrideIndex.setValue(currentIndex + 1);
    }, [data, animatedOverrideIndex]);
    const handleNavigateToPreviousPage = useCallback(() => {
      const currentIndex = indexRef.current;
      if (currentIndex === 0) {
        return;
      }
      animatedOverrideIndex.setValue(currentIndex - 1);
    }, [animatedOverrideIndex]);
    useImperativeHandle(
      ref,
      () => ({
        next: handleNavigateToNextPage,
        previous: handleNavigateToPreviousPage,
      }),
      [handleNavigateToNextPage, handleNavigateToPreviousPage]
    );
    //#endregion

    //#region effects
    useCode(
      () =>
        onChange(
          animatedStaticIndex,
          call([animatedStaticIndex], args => {
            indexRef.current = args[0];
            /**
             * @DEV
             * here we directly manipulate pages native props by setting `pointerEvents`
             * to `auto` for current page and `none` for others.
             */
            pagesRef.current.map((pageRef, _index) => {
              // @ts-ignore
              pageRef.setNativeProps({
                pointerEvents: _index === args[0] ? 'auto' : 'none',
              });
            });

            if (onIndexChange) {
              onIndexChange(args[0]);
            }
          })
        ),
      []
    );
    //#endregion

    // renders
    return (
      <PanGestureHandler {...gestureHandler}>
        <Animated.View onLayout={handleOnLayout} style={styles.container}>
          <Background
            animatedIndex={animatedIndex}
            data={data}
            safeInsets={safeInsets}
            screenDimensions={dimensions}
            indicatorSize={indicatorSize}
            animatedIndicatorsContainerPosition={
              animatedIndicatorsContainerPosition
            }
          />

          {data.map((item, index) => (
            <Page
              key={`page-${index}`}
              index={index}
              item={item}
              animatedIndex={animatedIndex}
              indicatorSize={indicatorSize}
              titleStyle={titleStyle}
              descriptionStyle={descriptionStyle}
              safeInsets={safeInsets}
              screenDimensions={dimensions}
              handleRef={handlePageRef}
            />
          ))}

          <IndicatorsContainer
            data={data}
            animatedIndex={animatedIndex}
            animatedIndicatorsContainerPosition={
              animatedIndicatorsContainerPosition
            }
            indicatorSize={indicatorSize}
            indicatorBackgroundColor={indicatorBackgroundColor}
            indicatorBorderColor={indicatorBorderColor}
            safeInsets={safeInsets}
          />

          <CloseButton
            data={data}
            animatedIndex={animatedIndex}
            safeInsets={safeInsets}
            closeButtonText={closeButtonText}
            closeButtonTextStyle={closeButtonTextStyle}
            closeButton={closeButton}
            onCloseButtonPress={onCloseButtonPress}
          />
        </Animated.View>
      </PanGestureHandler>
    );
  }
);

const PaperOnboarding = memo(PaperOnboardingComponent);

export default PaperOnboarding;
