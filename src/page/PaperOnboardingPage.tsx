import React, { useMemo } from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  PaperOnboardingItemType,
  PaperOnboardingSafeAreaInsetsType,
  PaperOnboardingScreenDimensions,
} from '../types';
import { styles } from './styles';

const { interpolate, sub, Extrapolate } = Animated;

interface PaperOnboardingPageProps {
  index: number;
  item: PaperOnboardingItemType;
  currentIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  indicatorSize: number;
  screenDimensions: PaperOnboardingScreenDimensions;
  safeInsets: PaperOnboardingSafeAreaInsetsType;
}

export const PaperOnboardingPage = (props: PaperOnboardingPageProps) => {
  // props
  const {
    index,
    item,
    currentIndex,
    animatedIndicatorsContainerPosition,
    indicatorSize,
    screenDimensions,
    safeInsets,
  } = props;

  // memo
  const pageBackgroundExtendedSize = useMemo(
    () => screenDimensions.height * 2,
    [screenDimensions]
  );

  // animations
  const animatedContentOpacity = interpolate(currentIndex, {
    inputRange: [index - 0.5, index, index + 0.5],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedContentTopPosition = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [
      screenDimensions.height / 8,
      0,
      (screenDimensions.height / 6) * -1,
    ],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedImageTopPosition = interpolate(currentIndex, {
    inputRange: [index - 1, index],
    outputRange: [screenDimensions.height / 8, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBackgroundScale = interpolate(currentIndex, {
    inputRange: [index - 1, index],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBackgroundLeftPosition = sub(
    animatedIndicatorsContainerPosition,
    pageBackgroundExtendedSize / 2 - indicatorSize / 2 - index * indicatorSize
  );

  // styles
  const contentContainerStyle = useMemo(
    () => [
      styles.contentContainer,
      {
        marginTop: safeInsets.top,
        marginRight: safeInsets.right,
        marginLeft: safeInsets.left,
        marginBottom: safeInsets.bottom + indicatorSize + safeInsets.bottom,
        opacity: animatedContentOpacity,
        transform: [{ translateY: animatedContentTopPosition }],
      },
    ],
    [
      animatedContentOpacity,
      animatedContentTopPosition,
      safeInsets,
      indicatorSize,
    ]
  );

  const titleStyle = useMemo(
    () => [styles.title, item.titleStyle ? item.titleStyle : null],
    [item]
  );

  const descriptionStyle = useMemo(
    () => [
      styles.description,
      item.descriptionStyle ? item.descriptionStyle : null,
    ],
    [item]
  );

  const imageContainerStyle = useMemo(
    () => [
      styles.imageContainer,
      {
        transform: [{ translateY: animatedImageTopPosition }],
      },
    ],
    [animatedImageTopPosition]
  );

  const backgroundStyle = useMemo(
    () => [
      styles.background,
      {
        backgroundColor: item.color,
        width: pageBackgroundExtendedSize,
        height: pageBackgroundExtendedSize,
        borderRadius: pageBackgroundExtendedSize,
        top:
          screenDimensions.height -
          indicatorSize / 2 -
          pageBackgroundExtendedSize / 2 -
          safeInsets.bottom,
        left: animatedBackgroundLeftPosition,
        transform: [{ scale: animatedBackgroundScale }],
      },
    ],
    [
      item,
      animatedBackgroundLeftPosition,
      animatedBackgroundScale,
      screenDimensions,
      pageBackgroundExtendedSize,
      safeInsets,
      indicatorSize,
    ]
  );

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={backgroundStyle} />
      <Animated.View style={contentContainerStyle}>
        {item.image && (
          <Animated.View style={imageContainerStyle}>
            {item.image()}
          </Animated.View>
        )}
        <Text style={titleStyle}>{item.title}</Text>
        <Text style={descriptionStyle}>{item.description}</Text>
      </Animated.View>
    </Animated.View>
  );
};
