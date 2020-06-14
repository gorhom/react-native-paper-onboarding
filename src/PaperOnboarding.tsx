import React, { useMemo, useRef, useCallback, memo, useState } from 'react';
import { Dimensions, Insets, LayoutChangeEvent } from 'react-native';
import { usePanGestureHandler, useValue } from 'react-native-redash';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import Background from './components/background';
import Page from './components/page';
import IndicatorsContainer from './components/indicatorsContainer';
import CloseButton from './components/closeButton';
import { useTiming } from './useTiming';
import { PaperOnboardingProps, PaperOnboardingScreenDimensions } from './types';
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

// @ts-ignore
Animated.addWhitelistedUIProps({
  cx: true,
  cy: true,
  r: true,
  fillOpacity: true,
  pointerEvents: true,
});

const { interpolate, add, useCode, onChange, call } = Animated;

const PaperOnboardingComponent = ({
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
}: PaperOnboardingProps) => {
  // state
  const [dimensions, setDimensions] = useState<PaperOnboardingScreenDimensions>(
    {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
  );

  // refs
  const pagesRef = useRef<Array<Animated.View | null>>(data.map(() => null));

  //#region variables
  const safeInsets = useMemo<Required<Insets>>(() => {
    return {
      top: _safeInsets?.top ?? DEFAULT_SAFE_INSET,
      bottom: _safeInsets?.bottom ?? DEFAULT_SAFE_INSET,
      left: _safeInsets?.left ?? DEFAULT_SAFE_INSET,
      right: _safeInsets?.right ?? DEFAULT_SAFE_INSET,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_safeInsets]);
  //#endregion

  // memo
  const {
    gestureHandler,
    state,
    translation,
    velocity,
  } = usePanGestureHandler();

  const indicatorsContainerLeftPadding = useMemo(
    () => dimensions.width / 2 - indicatorSize / 2,
    [dimensions.width, indicatorSize]
  );

  // animations
  const animatedStaticIndex = useValue(0);
  const animatedIndex = useTiming({
    animatedStaticIndex,
    value: direction === 'horizontal' ? translation.x : translation.y,
    velocity: direction === 'horizontal' ? velocity.x : velocity.y,
    state: state,
    size: data.length,
    screenWidth: dimensions.width,
  });

  const animatedIndicatorsContainerPosition = add(
    interpolate(animatedIndex, {
      inputRange: data.map((_, index) => index),
      outputRange: data.map((_, index) => index * indicatorSize * -1),
      extrapolate: Animated.Extrapolate.CLAMP,
    }),
    indicatorsContainerLeftPadding
  );

  // callbacks
  const handlePageRef = useCallback((ref, index) => {
    pagesRef.current[index] = ref;
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

  //#region effects
  useCode(
    () =>
      onChange(
        animatedStaticIndex,
        call([animatedStaticIndex], args => {
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
};

const PaperOnboarding = memo(PaperOnboardingComponent, isEqual);

export default PaperOnboarding;
