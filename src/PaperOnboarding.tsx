import React, { useMemo, useCallback } from 'react';
import { Dimensions, StatusBar, Platform } from 'react-native';
import { horizontalPanGestureHandler } from 'react-native-redash';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { interpolate, add } from 'react-native-reanimated';

import { PaperOnboardingButton } from './button';
import { PaperOnboardingIndicatorsContainer } from './indicatorsContainer';
import { PaperOnboardingPage } from './page/PaperOnboardingPage';
import { withTiming } from './withTiming';
import {
  PaperOnboardingItemType,
  PaperOnboardingSafeAreaInsetsType,
} from './types';
import { styles } from './styles';

interface PaperOnboardingProps {
  data: PaperOnboardingItemType[];
  safeInsets?: Partial<PaperOnboardingSafeAreaInsetsType>;
  indicatorSize?: number;
  closeButtonText?: string;
  onCloseButtonPress: () => void;
}

export const PaperOnboarding = (props: PaperOnboardingProps) => {
  // props
  const {
    data,
    safeInsets: _safeInsets,
    indicatorSize = 40,
    closeButtonText = 'close',
    onCloseButtonPress,
  } = props;
  const safeInsets = useMemo<PaperOnboardingSafeAreaInsetsType>(
    () => ({
      top: _safeInsets?.top ?? 50,
      bottom: _safeInsets?.bottom ?? 50,
      left: _safeInsets?.left ?? 50,
      right: _safeInsets?.right ?? 50,
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
    value: translationX,
    velocity: velocityX,
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

        <PaperOnboardingButton
          lastIndex={data.length}
          currentIndex={currentIndex}
          safeInsets={safeInsets}
          text={closeButtonText}
          onPress={onCloseButtonPress}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
