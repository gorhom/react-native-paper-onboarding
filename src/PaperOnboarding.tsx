import React, { useMemo, useCallback } from 'react';
import { View, Dimensions } from 'react-native';
import { horizontalPanGestureHandler, ReText } from 'react-native-redash';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  add,
  concat,
  block,
  call,
} from 'react-native-reanimated';
import { withSpring } from './withSpring';
import {
  PaperOnboardingItemType,
  PaperOnboardingSafeAreaInsetsType,
} from './types';
import { PaperOnboardingIndicatorsContainer } from './indicatorsContainer';
import { PaperOnboardingPage } from './page/PaperOnboardingPage';
import { styles } from './styles';

interface PaperOnboardingProps {
  data: PaperOnboardingItemType[];
  safeInsets?: Partial<PaperOnboardingSafeAreaInsetsType>;
  indicatorSize?: number;
}

export const PaperOnboarding = (props: PaperOnboardingProps) => {
  // props
  const { data, safeInsets: _safeInsets, indicatorSize = 40 } = props;

  const safeInsets = useMemo<PaperOnboardingSafeAreaInsetsType>(
    () => ({
      top: _safeInsets?.top || 50,
      bottom: _safeInsets?.bottom || 50,
      left: _safeInsets?.left || 50,
      right: _safeInsets?.right || 50,
    }),
    [_safeInsets]
  );

  // memo
  const {
    gestureHandler,
    state,
    translationX,
    velocityX,
  } = horizontalPanGestureHandler();

  const screenDimensions = useMemo(
    () => ({
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
    }),
    []
  );

  const indicatorsContainerLeftPadding = useMemo(
    () => screenDimensions.width / 2 - indicatorSize / 2,
    [screenDimensions, indicatorSize]
  );

  // animations
  const currentIndex = withSpring({
    value: translationX,
    velocity: velocityX,
    state: state,
    size: data.length,
  });

  const animatedIndicatorsContainerPosition = add(
    interpolate(currentIndex, {
      inputRange: data.map((_, index) => index),
      outputRange: data.map((_, index) => index * indicatorSize * -1),
      extrapolate: Animated.Extrapolate.CLAMP,
    }),
    indicatorsContainerLeftPadding
  );

  // renders
  const renderPages = useCallback(
    () =>
      data.map((item, index) => {
        return (
          <PaperOnboardingPage
            key={`page-${index}`}
            index={index}
            item={item}
            currentIndex={currentIndex}
            animatedIndicatorsContainerPosition={
              animatedIndicatorsContainerPosition
            }
            indicatorSize={indicatorSize}
            safeInsets={safeInsets}
            screenDimensions={screenDimensions}
          />
        );
      }),
    [
      data,
      currentIndex,
      animatedIndicatorsContainerPosition,
      indicatorSize,
      screenDimensions,
      safeInsets,
    ]
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.container}>
        {renderPages()}
        <PaperOnboardingIndicatorsContainer
          data={data}
          currentIndex={currentIndex}
          animatedIndicatorsContainerPosition={
            animatedIndicatorsContainerPosition
          }
          indicatorSize={indicatorSize}
          safeInsets={safeInsets}
        />
        <View style={styles.debugContainer}>
          <Animated.Code>
            {() =>
              block([
                call(
                  [currentIndex, concat(`currentIndex: `, currentIndex)],
                  args => console.log(`currentIndex: ${args[0]}, ${args[1]}`)
                ),
              ])
            }
          </Animated.Code>
          <ReText
            style={styles.text}
            text={concat(`translationX: `, translationX)}
          />
          <ReText style={styles.text} text={concat(`velocityX: `, velocityX)} />
          <ReText
            style={styles.text}
            text={concat(`currentIndex: `, currentIndex)}
          />
          <ReText
            style={styles.text}
            text={concat(`threshold: `, screenDimensions.width / 2)}
          />
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
