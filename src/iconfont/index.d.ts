/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

export { default as IconMorentouxiang } from './IconMorentouxiang';
export { default as IconPlay } from './IconPlay';
export { default as IconBack } from './IconBack';
export { default as IconArrowRight } from './IconArrowRight';
export { default as IconClose } from './IconClose';

interface Props extends GProps, ViewProps {
  name: 'morentouxiang' | 'play' | 'back' | 'arrow-right' | 'Close';
  size?: number;
  color?: string | string[];
}

declare const IconFont: FunctionComponent<Props>;

export default IconFont;
