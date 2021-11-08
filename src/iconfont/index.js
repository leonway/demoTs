/* eslint-disable */

import React from 'react';

import IconMorentouxiang from './IconMorentouxiang';
import IconPlay from './IconPlay';
import IconBack from './IconBack';
import IconArrowRight from './IconArrowRight';
import IconClose from './IconClose';
export { default as IconMorentouxiang } from './IconMorentouxiang';
export { default as IconPlay } from './IconPlay';
export { default as IconBack } from './IconBack';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconClose } from './IconClose';

let IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'morentouxiang':
      return <IconMorentouxiang key="1" {...rest} />;
    case 'play':
      return <IconPlay key="2" {...rest} />;
    case 'back':
      return <IconBack key="3" {...rest} />;
    case 'arrow-right':
      return <IconArrowRight key="4" {...rest} />;
    case 'Close':
      return <IconClose key="5" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
