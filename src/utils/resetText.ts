import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';
const defaultFontFamily = {
	...Platform.select({
		android: { fontFamily: '' }
	})
};
const oldRender = (Text as any).render;
(Text as any).render = function (...args) {
	const origin = oldRender.call(this, ...args);
	return React.cloneElement(origin, {
		style: [defaultFontFamily, origin.props.style]
	});
};
