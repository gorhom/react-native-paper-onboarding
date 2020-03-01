import React, { useMemo, useCallback } from 'react';
import Animated from 'react-native-reanimated';
import { PaperOnboardingIndicator } from '../indicator';
import {
  PaperOnboardingItemType,
  PaperOnboardingSafeAreaInsetsType,
} from '../types';
import { styles } from './styles';

interface PaperOnboardingIndicatorsContainerProps {
  data: PaperOnboardingItemType[];
  currentIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  indicatorSize: number;
  indicatorColor: string;
  safeInsets: PaperOnboardingSafeAreaInsetsType;
}

export const PaperOnboardingIndicatorsContainer = (
  props: PaperOnboardingIndicatorsContainerProps
) => {
  // props
  const {
    data,
    currentIndex,
    animatedIndicatorsContainerPosition,
    indicatorSize,
    indicatorColor,
    safeInsets,
  } = props;

  // variables
  const containerWidth = useMemo(() => {
    return data.length * indicatorSize;
  }, [data, indicatorSize]);

  // style
  const containerStyle = useMemo(
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
          <PaperOnboardingIndicator
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
