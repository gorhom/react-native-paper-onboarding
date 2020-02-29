import * as React from 'react';
import Svg, { Defs, Path, Use } from 'react-native-svg';

const ShoppingCartSVG = () => (
  <Svg width={23} height={19} viewBox="0 0 23 19">
    <Defs>
      <Path
        d="M20.453 12H2.55c-.553 0-.882.438-.737.973l1.368 5.054c.146.537.712.973 1.272.973H18.55c.557 0 1.127-.438 1.272-.973l1.369-5.054c.145-.537-.19-.973-.738-.973zM16.616.835a1 1 0 00-1.732 1L17.289 6H5.78l2.405-4.165a1 1 0 10-1.732-1L3.472 6H1.003A1 1 0 000 7.01v1.98A1 1 0 001.003 10h20.994A1 1 0 0023 8.99V7.01A1 1 0 0021.997 6h-2.399L16.616.835z"
        id="prefix__a"
      />
    </Defs>
    <Use fill="#9D8FBF" xlinkHref="#prefix__a" fillRule="evenodd" />
  </Svg>
);

export default ShoppingCartSVG;
