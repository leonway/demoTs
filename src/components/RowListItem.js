import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Iconfont from '@/iconfont';
import {PropTypes} from 'prop-types';

export const defaultRightIcon = (
  <Iconfont size={22} color="#B2B6C2" name="arrow-right" />
);

export default function RowListItem(componentProps) {
  // console.log(componentProps.key,componentProps.uniKey);
  const navigation = useNavigation();
  let {
    leftContent,
    title,
    rightContent,
    uniKey,
    onClick,
    readOnly = false,
    data,
    isLast,
  } = componentProps;

  leftContent = leftContent || null;
  rightContent = (
    <>
      <Text style={s.rightContentText}>{rightContent}</Text>
      {!readOnly ? defaultRightIcon : null}
    </>
  );
  const props = {
    
  };
  // console.log('----RowListItem-----');
  //     console.log(onClick,readOnly);
  if (!readOnly) {
    props.onPress = () => {
      onClick && onClick(uniKey, data, navigation);
    };
  }
  console.log(props);
  return (
    <View style={s.fenGe}>
      <TouchableHighlight {...props}>
      <View style={[s.container, {borderBottomWidth: isLast ? 0 : 1}]}>
        <View style={s.leftBox}>{leftContent}</View>
        <View style={s.titleBox}>
          <Text style={s.titleText}>{title}</Text>
        </View>
        <View style={s.rightBox}>{rightContent}</View>
      </View>
    </TouchableHighlight>
    </View>
  );
}

RowListItem.propTypes = {
  // style: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  uniKey: PropTypes.string.isRequired,
  // key: PropTypes.string,
  leftContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  rightContent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
};

const s = StyleSheet.create({
  fenGe:{
    marginBottom: 8,
  },
  container: {
    // flex: 1,
    minHeight: 60,
    width: '100%',
    // borderWidth: 1,
    // borderColor:'orange',

    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // padding:5,
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
  },
  leftBox: {
    maxWidth: 50,
  },
  titleBox: {
    flex: 1,
    marginHorizontal: 15,
  },
  titleText: {
    color: '#2A2C34',
    fontSize: 16,
  },
  rightBox: {
    // flex: 1,
    minWidth: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rightContentText: {},
});
