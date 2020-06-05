import React, { useMemo, MutableRefObject, useCallback, memo } from 'react';
import { Text, TextStyle, Insets } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import {
  PaperOnboardingItemType,
  PaperOnboardingScreenDimensions,
} from '../../types';
import { styles } from './styles';
import { calculateRectangleCircleRadius } from '../../utils/math';

const { interpolate, add, Extrapolate } = Animated;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface PaperOnboardingPageProps {
  index: number;
  item: PaperOnboardingItemType;
  currentIndex: Animated.Node<number>;
  animatedIndicatorsContainerPosition: Animated.Node<number>;
  indicatorSize: number;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  screenDimensions: PaperOnboardingScreenDimensions;
  safeInsets: Required<Insets>;
  handleRef: (ref: MutableRefObject<Animated.View>, index: number) => void;
}

const PageComponent = ({
  index,
  item,
  currentIndex,
  animatedIndicatorsContainerPosition,
  indicatorSize,
  titleStyle: titleStyleOverride,
  descriptionStyle: descriptionStyleOverride,
  screenDimensions,
  safeInsets,
  handleRef,
}: PaperOnboardingPageProps) => {
  // memo
  const backgroundExtendedSize = useMemo(() => {
    return calculateRectangleCircleRadius({
      width: screenDimensions.width,
      height: screenDimensions.height,
      indicatorX: safeInsets.bottom,
      indicatorY: 0,
    });
  }, [screenDimensions, safeInsets]);
  const backgroundBottomPosition = useMemo(
    () => screenDimensions.height - indicatorSize / 2 - safeInsets.bottom,
    [screenDimensions, indicatorSize, safeInsets]
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

  const animatedBackgroundSize = interpolate(currentIndex, {
    inputRange: [index - 1, index],
    outputRange: [0, backgroundExtendedSize],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedBackgroundLeftPosition = add(
    animatedIndicatorsContainerPosition,
    indicatorSize / 2,
    index * indicatorSize
  );

  // styles
  const contentContainerStyle: any = useMemo(
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
    () => [
      styles.title,
      titleStyleOverride,
      item.titleStyle ? item.titleStyle : null,
    ],
    [item, titleStyleOverride]
  );

  const descriptionStyle = useMemo(
    () => [
      styles.description,
      descriptionStyleOverride,
      item.descriptionStyle ? item.descriptionStyle : null,
    ],
    [item, descriptionStyleOverride]
  );

  const imageContainerStyle: any = useMemo(
    () => [
      styles.imageContainer,
      {
        transform: [{ translateY: animatedImageTopPosition }],
      },
    ],
    [animatedImageTopPosition]
  );

  const handleContainerRef = useCallback(ref => handleRef(ref, index), [
    index,
    handleRef,
  ]);

  return (
    <Animated.View
      pointerEvents={index === 0 ? 'auto' : 'none'}
      ref={handleContainerRef}
      style={styles.container}
    >
      <Svg style={styles.background}>
        <AnimatedCircle
          // @ts-ignore
          cx={animatedBackgroundLeftPosition}
          cy={backgroundBottomPosition}
          // @ts-ignore
          r={animatedBackgroundSize}
          fill={item.color}
        />
      </Svg>
      <Animated.View style={contentContainerStyle}>
        {item.content ? (
          typeof item.content === 'function' ? (
            item.content()
          ) : (
            item.content
          )
        ) : (
          <>
            {item.image && (
              <Animated.View style={imageContainerStyle}>
                {typeof item.image === 'function' ? item.image() : item.image}
              </Animated.View>
            )}
            <Text style={titleStyle}>{item.title}</Text>
            <Text style={descriptionStyle}>{item.description}</Text>
          </>
        )}
      </Animated.View>
    </Animated.View>
  );
};

const Page = memo(PageComponent);

export default Page;
