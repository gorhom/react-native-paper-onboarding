import React, { useMemo, useCallback, memo } from 'react';
import Animated from 'react-native-reanimated';
import Indicator from '../indicator';
import { IndicatorsContainerProps } from '../../types';
import { styles } from './styles';

const IndicatorsContainerComponent = ({
  data,
  animatedIndex,
  animatedIndicatorsContainerPosition,
  indicatorSize,
  indicatorBackgroundColor,
  indicatorBorderColor,
  safeInsets,
}: IndicatorsContainerProps) => {
  // variables
  const containerWidth = useMemo(() => {
    return data.length * indicatorSize;
  }, [data, indicatorSize]);

  // style
  const containerStyle: any = useMemo(
    () => [
      styles.container,
      {
        width: containerWidth,
        height: indicatorSize,
        bottom: safeInsets.bottom,
        transform: [{ translateX: animatedIndicatorsContainerPosition }],
      },
    ],
    [
      containerWidth,
      indicatorSize,
      animatedIndicatorsContainerPosition,
      safeInsets,
    ]
  );

  // renders
  const renderIndicators = useCallback(
    () =>
      data.map((item, index) => {
        return (
          <Indicator
            key={`item-${index}`}
            indicatorSize={indicatorSize}
            indicatorBackgroundColor={indicatorBackgroundColor}
            indicatorBorderColor={indicatorBorderColor}
            index={index}
            item={item}
            animatedIndex={animatedIndex}
          />
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, indicatorSize, indicatorBackgroundColor, indicatorBorderColor]
  );

  return (
    <Animated.View style={containerStyle}>{renderIndicators()}</Animated.View>
  );
};

const IndicatorsContainer = memo(IndicatorsContainerComponent);

export default IndicatorsContainer;
