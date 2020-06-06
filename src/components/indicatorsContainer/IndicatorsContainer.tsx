import React, { useMemo, useCallback, memo } from 'react';
import { Insets } from 'react-native';
import Animated from 'react-native-reanimated';
import Indicator from '../indicator';
import { PaperOnboardingItemType } from '../../types';
import { styles } from './styles';

interface IndicatorsContainerProps {
  data: PaperOnboardingItemType[];
  currentIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  indicatorSize: number;
  indicatorColor: string;
  safeInsets: Required<Insets>;
}

const IndicatorsContainerComponent = ({
  data,
  currentIndex,
  animatedIndicatorsContainerPosition,
  indicatorSize,
  indicatorColor,
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
            size={indicatorSize}
            color={indicatorColor}
            index={index}
            item={item}
            currentIndex={currentIndex}
          />
        );
      }),
    [data, indicatorSize, indicatorColor, currentIndex]
  );

  return (
    <Animated.View style={containerStyle}>{renderIndicators()}</Animated.View>
  );
};

const IndicatorsContainer = memo(IndicatorsContainerComponent);

export default IndicatorsContainer;
