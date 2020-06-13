import React, { memo, useMemo } from 'react';
import Svg from 'react-native-svg';
// @ts-ignore 😞
import isEqual from 'lodash.isequal';
import BackgroundCircle from '../backgroundCircle';
import { calculateRectangleCircleRadius } from '../../utils/math';
import { BackgroundProps } from '../../types';
import { styles } from './styles';

const BackgroundComponent = ({
  animatedIndex,
  data,
  screenDimensions,
  safeInsets,
  indicatorSize,
  animatedIndicatorsContainerPosition,
}: BackgroundProps) => {
  //#region variables
  const extendedSize = useMemo(() => {
    return calculateRectangleCircleRadius({
      width: screenDimensions.width,
      height: screenDimensions.height,
      indicatorX: safeInsets.bottom,
      indicatorY: 0,
    });
  }, [screenDimensions, safeInsets]);

  const bottomPosition = useMemo(
    () => screenDimensions.height - indicatorSize / 2 - safeInsets.bottom,
    [screenDimensions, indicatorSize, safeInsets]
  );
  //#endregion

  // render
  return (
    <Svg style={styles.container} pointerEvents="none">
      {data.map((item, index) => {
        return (
          <BackgroundCircle
            key={`circle-${index}`}
            index={index}
            animatedIndex={animatedIndex}
            color={item.backgroundColor}
            extendedSize={extendedSize}
            bottomPosition={bottomPosition}
            indicatorSize={indicatorSize}
            animatedIndicatorsContainerPosition={
              animatedIndicatorsContainerPosition
            }
          />
        );
      })}
    </Svg>
  );
};

const Background = memo(BackgroundComponent, isEqual);

export default Background;
