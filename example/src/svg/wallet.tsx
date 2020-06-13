import React from 'react';
import { Svg, Path } from 'react-native-svg';

const WalletSVG = ({ size, color = '#6CB2B8' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M3.129 2C1.403 2 0 3.34 0 4.994v15.014C0 21.107.935 22 2.088 22h19.824C23.06 22 24 21.108 24 20.008V7.992C24 6.893 23.065 6 21.912 6H2.088l-.001-1.006c0-.547.467-.994 1.042-.994h17.844c.576 0 1.043-.448 1.043-1s-.467-1-1.043-1H3.129zM18.5 12a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
      fill={color}
      fillRule="evenodd"
    />
  </Svg>
);

export default WalletSVG;
