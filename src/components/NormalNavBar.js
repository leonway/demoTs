import React from 'react'
import { StyleSheet,Text,View,TouchableOpacity } from 'react-native'
import NavigationBar from '@/components/NavigationBar'
import { useNavigation } from '@react-navigation/native';
import Iconfont from '@/iconfont'

export default function NormalNavBar({ titleStyle = {},title,style,backColor,statusBar = {},needGoBack = false }) {
  const navigation = useNavigation()
  const leftButton = (
    <TouchableOpacity onPress={() => navigation.goBack()} style={s.leftButton}>
      <Iconfont size={18} color={backColor || 'black'} name={'back'} />
    </TouchableOpacity>
  )
  const headerProps = {
    statusBar: {
      backgroundColor: "white",
      ...statusBar
    },
    title,
    titleStyle,
    style: {
      ...s.defaultStyle,
      ...style,
    }
  }
  if (needGoBack) {
    headerProps.leftButton = leftButton
  }

  return (
    <>
      <NavigationBar {...headerProps} />
    </>
  )
}

const s = StyleSheet.create({
  leftButton: {
    // borderWidth: 1,
    // borderColor:'red',
    // flex:1,
    padding: 15
  },
  defaultStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  }
})
