// In App.js in a new project
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen'
import { Toast, TopView } from 'teaset';
import AppNavigators from './routes/root'
import store from '@/store';

let splashScreenHasHide = false
let unsubscribe: any = null

export default () => {


  useEffect(() => {

    !splashScreenHasHide && setTimeout(() => {
      SplashScreen.hide()
      splashScreenHasHide = true
    }, 800);
    console.log('unsubscribe', unsubscribe);

    if (!unsubscribe) {
      console.log('addEventListener');

      unsubscribe = NetInfo.addEventListener(state => {
        // console.log(state);
        if (state.isConnected == false) {
          Toast.message('断网了');
          store.dispatch.common.setState({
            hasNetWork: false
          })
        } else {
          const { hasNetWork } = store.getModelState('common');
          if (hasNetWork == false) {
            Toast.message('已连接网络');
            store.dispatch.common.setState({
              hasNetWork: true
            })
          }
        }
      });
    }
    return () => {
      console.log('unsubscribe');

      unsubscribe && unsubscribe()
    }
  }, [])
  return <TopView>
    <SafeAreaView style={styles.safeAreaView}>
      <AppNavigators />
    </SafeAreaView>
  </TopView>
}


const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    height: "100%",
  },
});
