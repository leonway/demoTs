import React, { useRef, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BOTTOM_Tab_HEIGHT } from '@/utils/adapter'
import MainBottomTabBar from '@/components/MainBottomTabBar'
import Home from './Home';
import My from './My';
import { iconMaps } from '@/utils/imgConfig';

const Tab = createBottomTabNavigator()

export default (props) => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={(props) => <MainBottomTabBar {...props} />}
    // style={{ backgroundColor: 'tomato' }}
    // tabBarOptions={{
    //   // inactiveTintColor:'orange',
    //   // activeTintColor:'red'
    //   labelStyle: {
    //     fontSize: 12,
    //     top: -3
    //   },
    //   style: {
    //     height: BOTTOM_Tab_HEIGHT,
    //     // backgroundColor: 'transparent',
    //   }
    // }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "首页",
          tabBarIcon: ({ color, focused, size }) => (
            <Image
              source={iconMaps[focused ? 'xuanzhongshouye' : 'shouye']}
              style={s.icon}
            />
          )
        }}
      />
      <Tab.Screen
        name="my"
        component={My}
        options={{
          tabBarLabel: "我的",
          tabBarIcon: ({ color, focused, size }) => (
            <Image
              source={iconMaps[focused ? 'xuanzhongmy' : 'my']}
              style={s.icon}
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}

const s = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
})
