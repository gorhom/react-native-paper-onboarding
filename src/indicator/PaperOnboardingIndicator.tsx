import React, { useMemo, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { styles } from './styles';
import { PaperOnboardingItemType } from 'src/types';

const { interpolate, Extrapolate } = Animated;

interface PaperOnboardingIndicatorProps {
  size: number;
  index: number;
  item: PaperOnboardingItemType;
  currentIndex: Animated.Node<number>;
}

export const PaperOnboardingIndicator = (
  props: PaperOnboardingIndicatorProps
) => {
  // props
  const { size, index, currentIndex, item } = props;

  // animation
  const animatedScale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.33, 1, 0.33],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBackgroundOpacity = interpolate(currentIndex, {
    inputRange: [index - 1, index],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedIconOpacity = interpolate(currentIndex, {
    inputRange: [index - 0.25, index, index + 0.25],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedIconScale = interpolate(currentIndex, {
    inputRange: [index - 0.25, index, index + 0.25],
    outputRange: [0.33, 1, 0.33],
    extrapolate: Extrapolate.CLAMP,
  });

  // styles
  const containerStyle = useMemo(
    () => [
      styles.container,
      {
        width: size,
        height: size,
        borderRadius: size,
        transform: [{ scale: animatedScale }],
      },
    ],
    [size, animatedScale]
  );

  const borderStyle = useMemo(
    () => [
      styles.border,
      {
        borderRadius: size,
      },
    ],
    [size]
  );

  const fillStyle = useMemo(
    () => [
      styles.fill,
      {
        opacity: animatedBackgroundOpacity,
      },
    ],
    [animatedBackgroundOpacity]
  );

  const iconStyle = useMemo(
    () => [
      styles.iconContainer,
      {
        borderRadius: size,
        opacity: animatedIconOpacity,
        transform: [{ scale: animatedIconScale }],
      },
    ],
    [animatedIconOpacity, animatedIconScale, size]
  );

  // renders
  const renderIcon = useCallback(() => {
    if (item.icon) {
      return (
        <Animated.View style={iconStyle}>
          {typeof item.icon === 'function' ? item.icon() : item.icon}
        </Animated.View>
      );
    }
    return null;
  }, [item, iconStyle]);

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={fillStyle} />
      <Animated.View style={borderStyle} />
      {renderIcon()}
    </Animated.View>
  );
};
