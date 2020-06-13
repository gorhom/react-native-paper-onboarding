import React, { useMemo, memo, useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useValues, get } from 'react-native-redash';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import { CloseButtonProps } from '../../types';
import { styles } from './styles';

const { round } = Animated;

export const CloseButtonComponent = ({
  data,
  safeInsets,
  animatedIndex,
  closeButton,
  closeButtonText,
  closeButtonTextStyle: textStyleOverride,
  onCloseButtonPress,
}: CloseButtonProps) => {
  const containerRef = useRef<Animated.View>(null);

  //#region animations
  const animatedShowButtonOpacityValues = useValues(
    ...data.map((item, index) =>
      index === data.length - 1 || item.showCloseButton ? 1 : 0
    )
  );
  const animatedShowButtonPointerEventValues = useValues(
    ...data.map((item, index) =>
      index === data.length - 1 || item.showCloseButton ? 'auto' : 'none'
    )
  );

  const defaultShowButtonOpacity = new Animated.Value(0);
  const defaultShowButtonPointerEvent = new Animated.Value('none');

  const animatedShowButtonOpacity = get(
    animatedShowButtonOpacityValues,
    round(animatedIndex),
    defaultShowButtonOpacity
  );

  const animatedShowButtonPointerEvent = (get(
    // @ts-ignore
    animatedShowButtonPointerEventValues,
    round(animatedIndex),
    defaultShowButtonPointerEvent
  ) as any) as Animated.Value<'auto' | 'none'>;
  //#endregion

  //#region styles
  const containerStyle: any = useMemo(
    () => [
      styles.container,
      {
        opacity: animatedShowButtonOpacity,
        top: safeInsets.top,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [safeInsets]
  );
  const textStyle = useMemo(() => [styles.text, textStyleOverride], [
    textStyleOverride,
  ]);
  //#endregion
  return (
    <Animated.View
      ref={containerRef}
      pointerEvents={animatedShowButtonPointerEvent}
      style={containerStyle}
    >
      {closeButton ? (
        typeof closeButton === 'function' ? (
          closeButton()
        ) : (
          closeButton
        )
      ) : (
        <TouchableOpacity onPress={onCloseButtonPress}>
          <Text style={textStyle}>{closeButtonText}</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const CloseButton = memo(CloseButtonComponent, isEqual);

export default CloseButton;
