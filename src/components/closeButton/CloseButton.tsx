import React, { useMemo, memo, useRef, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { CloseButtonProps } from '../../types';
import { styles } from './styles';

const { round, onChange, call, useCode } = Animated;

export const CloseButtonComponent = ({
  data,
  safeInsets,
  currentIndex,
  text,
  textStyle: textStyleOverride,
  onPress,
  customButton,
}: CloseButtonProps) => {
  const containerRef = useRef<Animated.View>(null);

  //#region styles
  const containerStyle: any = useMemo(
    () => [
      styles.container,
      {
        top: safeInsets.top,
      },
    ],
    [safeInsets]
  );
  const textStyle = useMemo(() => [styles.text, textStyleOverride], [
    textStyleOverride,
  ]);
  //#endregion

  //#region callbacks
  const handleShowingButton = useCallback(
    (index: number) => {
      const shouldShowButton =
        index === data.length - 1 || data[index].showCloseButton === true;

      // @ts-ignore
      containerRef.current.setNativeProps({
        pointerEvents: shouldShowButton ? 'auto' : 'none',
        opacity: shouldShowButton ? 1 : 0,
      });
    },
    [data]
  );
  //#endregion

  //#region effects
  useEffect(() => {
    handleShowingButton(0);
  }, [handleShowingButton]);

  useCode(
    () => [
      onChange(
        round(currentIndex),
        call([round(currentIndex)], args => {
          handleShowingButton(args[0]);
        })
      ),
    ],
    [handleShowingButton]
  );
  //#endregion

  return (
    <Animated.View ref={containerRef} style={containerStyle}>
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

const CloseButton = memo(CloseButtonComponent);

export default CloseButton;
