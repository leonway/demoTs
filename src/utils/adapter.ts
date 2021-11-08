'use strict';
import { Dimensions, StatusBar, Platform, PixelRatio } from 'react-native';

//UI设计图的宽度
const designWidth = 750;
//UI设计图的高度
const designHeight = 1334;

//手机屏幕的宽度
export const WindowWidth = Dimensions.get('window').width;
//手机屏幕的高度
export const WindowHeight = Dimensions.get('window').height;
console.log("---Dimensions.get('window')----");
console.log(WindowHeight);
//计算手机屏幕宽度对应设计图宽度的单位宽度
export const unitWidth = WindowWidth / designWidth;
//计算手机屏幕高度对应设计图高度的单位高度
export const unitHeight = WindowHeight / designHeight;


export const widthHeightRatio = WindowHeight / WindowWidth;

export const safeAreaViewHeight = isIphoneX() ? 34 : 0;

//字体缩放比例，一般情况下不用考虑。
// 当应用中的字体需要根据手机设置中字体大小改变的话需要用到缩放比例
export const fontscale = PixelRatio.getFontScale();

/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    return Platform.OS == 'ios' && (WindowHeight == X_HEIGHT && WindowWidth == X_WIDTH);
}

//状态栏的高度
export function getStatusBarHeight() {
    if (Platform.OS == 'android') {
        return StatusBar.currentHeight || 20;
    }
    if (isIphoneX()) {
        return 44;
    }
    return 20
}

export const BOTTOM_Tab_HEIGHT = 50

const NAV_BAR_HEIGHT_IOS = 44;//导航栏在iOS中的高度
const NAV_BAR_HEIGHT_ANDROID = 50;//导航栏在Android中的高度
export const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID;
// export const STATUS_BAR_HEIGHT = (Platform.OS !== 'ios' || DeviceInfo.isIPhoneX_deprecated) ? 0 : 20;//状态栏的高度
export const STATUS_BAR_HEIGHT = getStatusBarHeight()//状态栏的高度
console.log('----STATUS_BAR_HEIGHT------');
console.log(STATUS_BAR_HEIGHT);
//标题栏的高度
export const titleHeight = unitWidth * 100 + STATUS_BAR_HEIGHT;

// export const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;export const NAVIGATION_BAR_HEIGHT = unitWidth*NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT;
