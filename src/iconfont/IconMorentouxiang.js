/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconMorentouxiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M642.56 709.12C638.72 669.44 640 640 640 602.88c17.92-10.24 81.92-71.68 87.04-122.88 14.08-1.28 37.12-15.36 43.52-71.68 3.84-29.44-10.24-47.36-19.2-52.48 23.04-70.4 33.28-290.56-128-312.32C606.72 15.36 564.48 0 509.44 0 289.28 3.84 224 168.96 272.64 357.12c-8.96 5.12-23.04 21.76-19.2 52.48 6.4 56.32 29.44 70.4 43.52 71.68 5.12 52.48 69.12 113.92 87.04 122.88 0 37.12 1.28 65.28-2.56 106.24C337.92 828.16 52.48 766.72 38.4 1024l947.2 0C977.92 762.88 686.08 828.16 642.56 709.12z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconMorentouxiang.defaultProps = {
  size: 18,
};

IconMorentouxiang = React.memo ? React.memo(IconMorentouxiang) : IconMorentouxiang;

export default IconMorentouxiang;