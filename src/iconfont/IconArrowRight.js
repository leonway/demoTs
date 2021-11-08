/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

let IconArrowRight = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M758.45630236 511.84800284l-42.8577425-42.88472402-0.18347519 0.18167693L308.40144014 62.09803319l-42.85774249 42.85774249 407.0181419 407.04422432L265.54369765 919.04782169l42.85774249 42.8532451 407.01364453-407.0433243 0.18347519 0.18167694 42.85774249-42.88922137-0.15199718-0.15109718L758.45630236 511.84800284zM758.45630236 511.84800284"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconArrowRight.defaultProps = {
  size: 18,
};

IconArrowRight = React.memo ? React.memo(IconArrowRight) : IconArrowRight;

export default IconArrowRight;
