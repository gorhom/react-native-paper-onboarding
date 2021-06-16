import React from 'react';
import { View, Text, StyleSheet, Alert, ViewStyle } from 'react-native';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PageContentProps } from '@gorhom/paper-onboarding';
import { TouchableOpacityProps } from 'react-native';

const AnimatedTouchableOpacity: React.FC<
  Animated.AnimateProps<ViewStyle, TouchableOpacityProps>
> = Animated.createAnimatedComponent(TouchableOpacity) as any;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    marginBottom: 25,
    backgroundColor: '#333',
  },

  item: {
    width: 300,
    height: 30,
    marginBottom: 12,
    backgroundColor: '#333',
  },

  item2: {
    width: 200,
    height: 30,
    marginBottom: 12,
    backgroundColor: '#333',
  },

  buttonText: {
    padding: 15,
    color: 'white',
    backgroundColor: '#333',
  },
});

const CustomView = ({ animatedFocus }: PageContentProps) => {
  //#region animations
  const animatedBoxTranslateY = interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  //#region styles
  const boxStyle = [
    styles.box,
    {
      transform: [
        { translateY: animatedBoxTranslateY },
      ] as Animated.AnimatedTransform,
    },
  ];
  const item1Style = [
    styles.item,
    {
      opacity: interpolate(animatedFocus, {
        inputRange: [0.5, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    },
  ];
  const item2Style = [
    styles.item,
    {
      opacity: interpolate(animatedFocus, {
        inputRange: [0.625, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    },
  ];
  const item3Style = [
    styles.item2,
    {
      opacity: interpolate(animatedFocus, {
        inputRange: [0.75, 1],
        outputRange: [0, 1],
        extrapolate: Extrapolate.CLAMP,
      }),
    },
  ];
  const buttonStyle = {
    opacity: interpolate(animatedFocus, {
      inputRange: [0.875, 1],
      outputRange: [0, 1],
      extrapolate: Extrapolate.CLAMP,
    }),
  };
  //#endregion

  const handleButtonPress = () => {
    Alert.alert('Button Clicked !');
  };
  return (
    <View
      style={styles.container}
      shouldRasterizeIOS={true}
      needsOffscreenAlphaCompositing={true}
    >
      <Animated.View style={boxStyle} />
      <Animated.View style={item1Style} />
      <Animated.View style={item2Style} />
      <Animated.View style={item3Style} />
      <AnimatedTouchableOpacity style={buttonStyle} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Button</Text>
      </AnimatedTouchableOpacity>
    </View>
  );
};

export default CustomView;
