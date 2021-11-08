import React from 'react'
import PropTypes from 'prop-types';
import ImgPick from './ImgPick'
import { InputItem, ImagePicker } from '@ant-design/react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native'

// 文本输入框
const text = ({forwardedRef,...props}) => {
  return <TextInput 
          style={s.text}
          clearButtonMode={'while-editing'}
          ref={forwardedRef} 
          {...props} 
        />;
};

const imgPick = ({forwardedRef,...props}) => {

  return <ImgPick 
  ref={forwardedRef} 
  {...props} 
  />;
};

const controls = {
  text,
  imgPick
}

const Control = ({forwardedRef,...props})=>{
  const { type } = props
  if(controls.hasOwnProperty(type)){
    return controls[type]({...props,forwardedRef})
  }
  console.warn('type error :'+type);
  return null
}

export default React.forwardRef((props, ref) => {
  return <Control {...props} forwardedRef={ref} />;
});

const s = StyleSheet.create({
  text:{
    color:'#2A2B33',
    fontWeight: 'bold',
  }
})
