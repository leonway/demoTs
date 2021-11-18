import React, { useEffect, useState } from 'react'
import NavigationBar from '@/components/NavigationBar'
import { iconMaps } from '@/utils/imgConfig';
import { StyleSheet, Text, View, FlatList, ImageBackground } from 'react-native'

const A = () => {
  const [list, setList] = useState([{ url: 'https://gw.alipayobjects.com/zos/bmw-prod/501b3e5b-8924-45cd-95ee-4c7470570204.svg', title: '唐代青花瓷', size: '32M', number: 24, time: new Date().toLocaleDateString() }])
  useEffect(() => {

  })
  return (
    <>
      <NavigationBar

        titleStyle={{
          color: 'white'
        }}
        style={{
          paddingHorizontal: 6,
          backgroundColor: '#222633'
        }}
        leftButton={<Text style={{ color: 'white', fontSize: 20 }}>我的识别物</Text>}
        rightButton={<Text style={{ color: '#1964FA', fontSize: 18 }}>编辑</Text>}
      />
      <FlatList data={list} style={s.box} keyExtractor={item => item.title} renderItem={({ item }: Record<string, any>) => (<View style={s.item}>
        <View style={s.leftBox}>
          <ImageBackground style={s.img} source={iconMaps['close']} />
        </View>
        <View style={s.rightContent}>
          <Text style={{ ...s.baseText, ...s.title }}>
            {item.title}
          </Text>
          <Text style={{ ...s.baseText, ...s.subTitle }}>
            {item.size}/{item.number}
          </Text>
          <Text style={{ ...s.baseText, ...s.subTitle }}>
            {item.time}
          </Text>
        </View>
      </View>)} />
    </>
  )
}

export default A

const s = StyleSheet.create({
  leftBox: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    paddingHorizontal: 6,
    backgroundColor: '#222633'
  },
  baseText: {
    color: 'white'
  },
  title: {
    fontSize: 18
  },
  subTitle: {
    fontSize: 14,
    opacity: 0.6
  },
  item: {
    borderRadius: 10,
    backgroundColor: '#303647',
    flexDirection: "row",
    paddingVertical: 6
  },
  img: {
    width: 60,
    height: 60
  },
  rightContent: {
    flex: 1,
    padding: 6
  }
})
