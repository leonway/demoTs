/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconPlay = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M241.986343 15.479156l651.846227 403.019276a105.815397 105.815397 0 0 1 0 186.93079l-651.846227 402.946199a112.611551 112.611551 0 0 1-168.807712-93.392318V111.867628A112.39232 112.39232 0 0 1 241.986343 15.479156"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPlay.defaultProps = {
  size: 18,
};

IconPlay = React.memo ? React.memo(IconPlay) : IconPlay;

export default IconPlay;
