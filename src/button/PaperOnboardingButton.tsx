import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { round } from 'react-native-reanimated';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { PaperOnboardingSafeAreaInsetsType } from '../types';
import { styles } from './styles';

const { interpolate, Extrapolate } = Animated;

interface PaperOnboardingButtonProps {
  lastIndex: number;
  safeInsets: PaperOnboardingSafeAreaInsetsType;
  currentIndex: Animated.Node<number>;
  text: string;
  onPress: () => void;
}

export const PaperOnboardingButton = (props: PaperOnboardingButtonProps) => {
  // props
  const { safeInsets, currentIndex, lastIndex, text, onPress } = props;

  // animations
  const animatedContainerScale = interpolate(currentIndex, {
    inputRange: [lastIndex - 2, lastIndex - 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  // styles
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        top: safeInsets.top,
        transform: [{ scale: round(animatedContainerScale) }],
      },
    ],
    [safeInsets, animatedContainerScale]
  );
  const textStyle = useMemo(() => [styles.text], []);

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity onPress={onPress}>
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
