import React, { useMemo, memo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { round } from 'react-native-reanimated';
import { CloseButtonProps } from '../../types';
import { styles } from './styles';

const { interpolate, Extrapolate } = Animated;

export const CloseButtonComponent = ({
  safeInsets,
  currentIndex,
  lastIndex,
  text,
  textStyle: textStyleOverride,
  onPress,
  customButton,
}: CloseButtonProps) => {
  // animations
  const animatedContainerScale = interpolate(currentIndex, {
    inputRange: [lastIndex - 2, lastIndex - 1],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  // styles
  const containerStyle: any = useMemo(
    () => [
      styles.container,
      {
        top: safeInsets.top,
        transform: [{ scale: round(animatedContainerScale) }],
      },
    ],
    [safeInsets, animatedContainerScale]
  );
  const textStyle = useMemo(() => [styles.text, textStyleOverride], [
    textStyleOverride,
  ]);

  return (
    <Animated.View style={containerStyle}>
      {customButton ? (
        typeof customButton === 'function' ? (
          customButton()
        ) : (
          customButton
        )
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const CloseButton = memo(CloseButtonComponent);

export default CloseButton;
