import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar, ActivityIndicator, LogBox } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import consoleAsyncStorage from './test';
import DeviceStorage from '@/utils/deviceStorage';
import { showMessage } from '@/utils/utils'

// 广告页
import Init from '@/containers/Init';

// 首页 展馆 会展通 消息 我的
import Main from '@/containers/Main';
// // 首页 项目中心
import Home from '@/containers/Main/Home'
// 登陆 注册页
import Login from '@/containers/Login';

const Stack = createStackNavigator();

export const navigationRef = React.createRef<any>();

export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}
if (!global._navigationRef) {
  global._navigationRef = navigationRef.current
}

if (!global._navigate) {
  global._navigate = navigate
}

const Root = (componentProps) => {
  const { currentUser, fetchStorageToUser } = componentProps;

  const [initialRouteName, setInitialRouteName] = useState('')

  LogBox.ignoreAllLogs()

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     try {
  //       const token = await DeviceStorage.get('token');
  //       setInitialRouteName(!!token ? 'main' : 'login')
  //     } catch (e) {
  //       showMessage(e && e.message);
  //       setInitialRouteName('login')
  //     }
  //   };
  //   // 每次启动的时候 把本地的用户信息同步到redux当中
  //   asyncFunc();
  // }, [])

  // useEffect(() => {
  //   const asyncFunc = async () => {
  //     try {
  //       const token = await DeviceStorage.get('token');
  //       if (token) {
  //         (!currentUser || !currentUser.token) && (await fetchStorageToUser());
  //       }
  //       // setInitialRouteName(!!token ? 'main' : 'login')
  //     } catch (e) {
  //       showMessage(e && e.message);
  //       //console.log(e);
  //       setInitialRouteName('login')
  //     }
  //   };
  //   // 每次启动的时候 把本地的用户信息同步到redux当中
  //   asyncFunc();
  // }, []);


  // if (!initialRouteName) {
  //   return <ActivityIndicator
  //     // style={s.indicator}
  //     color="#999"
  //     size="large"
  //     animating={true}
  //   />
  // }
  return (
    <View style={s.container}>
      <StatusBar backgroundColor="#222633" />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={async (route) => { }}
        theme={{
          ...DefaultTheme,
          colors: {
            ...DefaultTheme.colors,
            // primary:'red',
            // background:'orange'
          },
        }}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          // mode="modal"
          // headerMode="screen"
          screenOptions={{
            headerShown: false,
          }}>
          <>
            {/* <Stack.Screen name="init" component={Init} /> */}
            {/* 首页 项目中心 */}
            <Stack.Screen name="home" component={Home} />
            {/* <Stack.Screen name="orderDetails" component={OrderDetails} />
                  <Stack.Screen name="projectSteps" component={ProjectSteps} />
                  <Stack.Screen name="updateProgress" component={UpdateProgress} /> */}
            {/* 我的 所有项目 */}
            {/* <Stack.Screen name="allProject" component={AllProject} />
                  <Stack.Screen name="allOrderDetails" component={AllOrderDetails} />
                  <Stack.Screen name="allProjectSteps" component={AllProjectSteps} />
                  <Stack.Screen name="allUpdateProgress" component={AllUpdateProgress} /> */}
          </>

        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Root;

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
