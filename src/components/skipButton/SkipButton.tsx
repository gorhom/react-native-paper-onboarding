import React, { useMemo, ReactNode, memo } from 'react';
import { Text, TouchableOpacity, TextStyle, Insets } from 'react-native';
import Animated, { round } from 'react-native-reanimated';
import { styles } from './styles';

const { interpolate, Extrapolate } = Animated;

interface SkipButtonProps {
  lastIndex: number;
  safeInsets: Required<Insets>;
  currentIndex: Animated.Node<number>;
  text: string;
  textStyle?: TextStyle;
  onPress: () => void;
  customButton?: (() => ReactNode) | ReactNode;
}

export const SkipButtonComponent = ({
  safeInsets,
  currentIndex,
  lastIndex,
  text,
  textStyle: textStyleOverride,
  onPress,
  customButton,
}: SkipButtonProps) => {
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

const SkipButton = memo(SkipButtonComponent);

export default SkipButton;
