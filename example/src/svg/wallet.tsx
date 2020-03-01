import * as React from 'react';
import Svg, { Defs, Path, Use } from 'react-native-svg';

const WalletSVG = () => (
  <Svg width={23} height={19} viewBox="0 0 23 19">
    <Defs>
      <Path
        d="M20.1 0H2.998A2.998 2.998 0 000 2.994v14.014C0 18.107.896 19 2 19h19a2 2 0 002-1.992V5.992A1.997 1.997 0 0021 4H2V2.994C2 2.446 2.448 2 2.999 2h17.1a1 1 0 100-2zm-1.6 10a1.5 1.5 0 110 3 1.5 1.5 0 010-3z"
        id="prefix__a"
      />
    </Defs>
    <Use fill="#6CB2B8" xlinkHref="#prefix__a" fillRule="evenodd" />
  </Svg>
);

export default WalletSVG;
