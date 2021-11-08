/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconBack = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M226.354564 511.762209c0-15.150688 5.78104-30.302399 17.341203-41.863584L696.125531 17.486384c23.122371-23.122371 60.604926-23.122371 83.727297 0 23.122371 23.113289 23.122371 60.604926 0 83.727297L369.286648 511.762209l411.01183 411.027307c23.130302 23.118278 23.121348 60.600961 0 83.719238-23.106382 23.126336-60.596867 23.126336-83.711308 0L243.695766 553.63091C232.135604 542.069725 226.354564 526.914048 226.354564 511.762209L226.354564 511.762209z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconBack.defaultProps = {
  size: 18,
};

IconBack = React.memo ? React.memo(IconBack) : IconBack;

export default IconBack;
