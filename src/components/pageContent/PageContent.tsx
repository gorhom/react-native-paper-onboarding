import React, { useMemo, memo } from 'react';
import { Text, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PageContentProps } from '../../types';
import { styles } from './styles';

const { interpolate, Extrapolate } = Animated;

const SCREEN_HEIGHT = Dimensions.get('window').height;

const PageContentComponent = ({
  animatedFocus,
  image,
  title,
  description,
  titleStyle: titleStyleOverride,
  descriptionStyle: descriptionStyleOverride,
}: PageContentProps) => {
  //#region
  const animatedImageTopPosition = interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT / 8, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  //#region styles
  const titleStyle = useMemo(() => [styles.title, titleStyleOverride], [
    titleStyleOverride,
  ]);

  const descriptionStyle = useMemo(
    () => [styles.description, descriptionStyleOverride],
    [descriptionStyleOverride]
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
  //#endregion
  return (
    <>
      {image && (
        <Animated.View style={imageContainerStyle}>
          {typeof image === 'function' ? image() : image}
        </Animated.View>
      )}
      <Text style={titleStyle}>{title}</Text>
      <Text style={descriptionStyle}>{description}</Text>
    </>
  );
};

const PageContent = memo(PageContentComponent);

export default PageContent;
