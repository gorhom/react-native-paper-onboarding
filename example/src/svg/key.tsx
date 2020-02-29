import * as React from 'react';
import Svg, { Defs, Path, Use } from 'react-native-svg';

const KeySVG = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24">
    <Defs>
      <Path
        d="M2.399 2.38a8 8 0 0113.024 8.781l8.204 8.205.041.055c.328.56.285 3.53.285 3.53.001.544-.433.883-.967.756 0 0-4.538-1.035-5.022-1.519-.673-.673.475-1.574-.198-2.247-.5-.499-2.119-.07-2.618-.57-.464-.462.173-1.875-.29-2.338-.47-.469-2.038.011-2.507-.458l-1.171-1.17-.266.106a8.002 8.002 0 01-8.515-13.13zm8.02 3.778a3 3 0 10-4.242 4.243 3 3 0 004.243-4.243z"
        id="prefix__a"
      />
    </Defs>
    <Use fill="#698FB8" xlinkHref="#prefix__a" fillRule="evenodd" />
  </Svg>
);

export default KeySVG;
