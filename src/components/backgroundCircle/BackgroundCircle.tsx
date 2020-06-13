import React, { memo } from 'react';
import { ViewStyle } from 'react-native';
import { Circle, CircleProps } from 'react-native-svg';
import Animated, {
  interpolate,
  add,
  Extrapolate,
} from 'react-native-reanimated';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { BackgroundCircleProps } from '../../types';

const AnimatedCircle = Animated.createAnimatedComponent(
  Circle
) as React.ComponentClass<
  Animated.AnimateProps<ViewStyle, CircleProps & { style?: any }>
>;
const BackgroundCircleComponent = ({
  index,
  animatedIndex,
  color,
  extendedSize,
  bottomPosition,
  indicatorSize,
  animatedIndicatorsContainerPosition,
}: BackgroundCircleProps) => {
  //#region variables
  //#endregion

  //#region animations
  const animatedFocus = interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 2],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedRadius = interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [0, extendedSize],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedLeftPosition = add(
    animatedIndicatorsContainerPosition,
    indicatorSize / 2,
    index * indicatorSize
  );
  //#endregion

  // render
  return (
    <AnimatedCircle
      r={animatedRadius}
      cy={bottomPosition}
      cx={animatedLeftPosition}
      fill={color}
    />
  );
};

const BackgroundCircle = memo(BackgroundCircleComponent, isEqual);

export default BackgroundCircle;
