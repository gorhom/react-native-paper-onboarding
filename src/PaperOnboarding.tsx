import React, { useMemo, useRef, useCallback } from 'react';
import { Dimensions, StatusBar, Platform, Insets } from 'react-native';
import { usePanGestureHandler } from 'react-native-redash';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Page from './components/page';
import IndicatorsContainer from './components/indicatorsContainer';
import SkipButton from './components/skipButton';
import { withTiming } from './withTiming';
import { PaperOnboardingProps } from './types';
import { styles } from './styles';

const { interpolate, add, useCode, onChange, call, round } = Animated;
Animated.addWhitelistedNativeProps({ cx: true, cy: true, r: true });

export const PaperOnboarding = (props: PaperOnboardingProps) => {
  // props
  const {
    data,
    safeInsets: _safeInsets,
    direction = 'horizontal',
    indicatorSize = 40,
    indicatorColor = 'white',
    titleStyle,
    descriptionStyle,
    clostButtonTextStyle,
    closeButtonText = 'close',
    onCloseButtonPress,
    closeButton,
  } = props;
  const safeInsets = useMemo<Required<Insets>>(
    () => ({
      top: _safeInsets?.top ?? 50,
      bottom: _safeInsets?.bottom ?? 50,
      left: _safeInsets?.left ?? 50,
      right: _safeInsets?.right ?? 50,
    }),
    [_safeInsets]
  );

  // refs
  const pagesRef = useRef<Array<Animated.View | null>>(data.map(() => null));

  // memo
  const {
    gestureHandler,
    state,
    translation,
    velocity,
  } = usePanGestureHandler();

  const screenDimensions = useMemo(
    () => ({
      width: Dimensions.get('window').width,
      height:
        Dimensions.get('window').height -
        (Platform.OS === 'android' ? StatusBar.currentHeight ?? 0 : 0),
    }),
    []
  );

  const indicatorsContainerLeftPadding = useMemo(
    () => screenDimensions.width / 2 - indicatorSize / 2,
    [screenDimensions, indicatorSize]
  );

  // animations
  const currentIndex = withTiming({
    value: direction === 'horizontal' ? translation.x : translation.y,
    velocity: direction === 'horizontal' ? velocity.x : velocity.y,
    state: state,
    size: data.length,
    screenWidth: screenDimensions.width,
  });

  const animatedIndicatorsContainerPosition = add(
    interpolate(currentIndex, {
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

  /**
   * @DEV
   * here we directly manipulate pages native props, by setting `pointerEvents` to `auto` for selected page and `none` for others.
   */
  useCode(
    () =>
      onChange(
        round(currentIndex),
        call([currentIndex], args => {
          pagesRef.current.map((pageRef, index) => {
            // @ts-ignore
            pageRef.setNativeProps({
              pointerEvents: index === Math.round(args[0]) ? 'auto' : 'none',
            });
          });
        })
      ),
    []
  );

  // renders
  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        {data.map((item, index) => (
          <Page
            key={`page-${index}`}
            index={index}
            item={item}
            currentIndex={currentIndex}
            animatedIndicatorsContainerPosition={
              animatedIndicatorsContainerPosition
            }
            indicatorSize={indicatorSize}
            titleStyle={titleStyle}
            descriptionStyle={descriptionStyle}
            safeInsets={safeInsets}
            screenDimensions={screenDimensions}
            handleRef={handlePageRef}
          />
        ))}

        <IndicatorsContainer
          data={data}
          currentIndex={currentIndex}
          animatedIndicatorsContainerPosition={
            animatedIndicatorsContainerPosition
          }
          indicatorSize={indicatorSize}
          indicatorColor={indicatorColor}
          safeInsets={safeInsets}
        />

        <SkipButton
          lastIndex={data.length}
          currentIndex={currentIndex}
          safeInsets={safeInsets}
          text={closeButtonText}
          textStyle={clostButtonTextStyle}
          onPress={onCloseButtonPress}
          customButton={closeButton}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
