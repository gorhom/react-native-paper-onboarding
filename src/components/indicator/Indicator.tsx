import React, { useMemo, useCallback, memo } from 'react';
import { ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { Svg, Circle, CircleProps } from 'react-native-svg';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { IndicatorProps } from '../../types';
import { styles } from './styles';

const { interpolate, Extrapolate } = Animated;

const AnimatedCircle = Animated.createAnimatedComponent(
  Circle
) as React.ComponentClass<
  Animated.AnimateProps<ViewStyle, CircleProps & { style?: any }>
>;

const BORDER_WIDTH = 2;

const IndicatorComponent = ({
  index,
  indicatorSize,
  indicatorBackgroundColor,
  indicatorBorderColor,
  animatedIndex,
  item,
}: IndicatorProps) => {
  const radius = useMemo(() => (indicatorSize - 2) / 2, [indicatorSize]);

  //#region animation
  const animatedRadius = interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [radius * 0.33, radius, radius * 0.33],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedIconScale = interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1 * 0.33, 1, 1 * 0.33],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedIconOpacity = interpolate(animatedIndex, {
    inputRange: [index - 0.25, index, index + 0.25],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedCircleFillOpacity = interpolate(animatedIndex, {
    inputRange: [index - 1, index],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  //#region styles
  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      ...{
        width: indicatorSize,
        height: indicatorSize,
      },
    }),
    [indicatorSize]
  );

  const iconStyle: any = useMemo(
    () => ({
      ...styles.iconContainer,
      ...{
        left: BORDER_WIDTH * 2,
        right: BORDER_WIDTH * 2,
        top: BORDER_WIDTH * 2,
        bottom: BORDER_WIDTH * 2,
        borderRadius: indicatorSize,
        opacity: animatedIconOpacity,
        transform: [{ scale: animatedIconScale }],
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [indicatorSize]
  );
  //#endregion

  // renders
  const renderIcon = useCallback(() => {
    if (item.icon) {
      const IconComponent: any = item.icon;
      return (
        <Animated.View style={iconStyle}>
          {typeof IconComponent === 'function' ? (
            IconComponent({
              size: indicatorSize / 2,
            })
          ) : (
            <IconComponent size={indicatorSize / 2} />
          )}
        </Animated.View>
      );
    }
    return null;
  }, [item, indicatorSize, iconStyle]);

  return (
    <Animated.View style={containerStyle}>
      <Svg
        width={indicatorSize}
        height={indicatorSize}
        viewBox={`0 0 ${indicatorSize} ${indicatorSize}`}
      >
        <AnimatedCircle
          r={animatedRadius}
          cx={indicatorSize / 2}
          cy={indicatorSize / 2}
          // @ts-ignore
          fill={indicatorBackgroundColor}
          fillOpacity={animatedCircleFillOpacity}
          stroke={indicatorBorderColor}
          strokeWidth={BORDER_WIDTH}
        />
      </Svg>
      {renderIcon()}
    </Animated.View>
  );
};
const Indicator = memo(IndicatorComponent, isEqual);

export default Indicator;
