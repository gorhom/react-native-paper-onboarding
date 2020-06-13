import React, { useMemo, useCallback, memo } from 'react';
import Animated from 'react-native-reanimated';
import PageContent from '../pageContent/PageContent';
import { PageProps } from '../../types';
import { styles } from './styles';

const { interpolate, Extrapolate } = Animated;

const PageComponent = ({
  index,
  item,
  animatedIndex,
  indicatorSize,
  titleStyle: titleStyleOverride,
  descriptionStyle: descriptionStyleOverride,
  screenDimensions,
  safeInsets,
  handleRef,
}: PageProps) => {
  //#region animation
  const animatedFocus = interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 2],
    extrapolate: Extrapolate.CLAMP,
  });
  const animatedContentOpacity = interpolate(animatedFocus, {
    inputRange: [0.5, 1, 1.5],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const animatedContentTopPosition = interpolate(animatedFocus, {
    inputRange: [0, 1, 2],
    outputRange: [
      screenDimensions.height / 8,
      0,
      (screenDimensions.height / 6) * -1,
    ],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  //#region styles
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
    () => [titleStyleOverride, item.titleStyle ? item.titleStyle : null],
    [item, titleStyleOverride]
  );
  const descriptionStyle = useMemo(
    () => [
      descriptionStyleOverride,
      item.descriptionStyle ? item.descriptionStyle : null,
    ],
    [item, descriptionStyleOverride]
  );
  //#endregion

  //#region memo
  const pageContentProps = useMemo(
    () => ({
      index,
      animatedFocus,
      image: item.image,
      title: item.title,
      description: item.description,
      titleStyle,
      descriptionStyle,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, item, titleStyle, descriptionStyle]
  );
  //#endregion

  //#region callbacks
  const handleContainerRef = useCallback(ref => handleRef(ref, index), [
    index,
    handleRef,
  ]);
  //#endregion

  // render
  const renderContent = useCallback(() => {
    const ContentComponent: any = item.content;
    return ContentComponent ? (
      typeof ContentComponent === 'function' ? (
        ContentComponent(pageContentProps)
      ) : (
        <ContentComponent {...pageContentProps} />
      )
    ) : (
      <PageContent {...pageContentProps} />
    );
  }, [item, pageContentProps]);
  return (
    <Animated.View
      pointerEvents={index === 0 ? 'auto' : 'none'}
      ref={handleContainerRef}
      style={styles.container}
    >
      <Animated.View style={contentContainerStyle}>
        {renderContent()}
      </Animated.View>
    </Animated.View>
  );
};

const Page = memo(PageComponent);

export default Page;
