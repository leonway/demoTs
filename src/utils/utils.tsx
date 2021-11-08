import React from 'react';
import RNFS from 'react-native-fs';
import { Toast, Theme } from 'teaset'
import { ActivityIndicator } from 'react-native';
import deviceStorage from "./deviceStorage";
import CameraRoll from "@react-native-community/cameraroll";
import Geolocation from '@react-native-community/geolocation';

// 自营h5 地址前缀
// export const URL_PREFIX = 'https://h5-tfhzt.iotcd.net/#'
export const URL_PREFIX2 = 'https://share-tfhzt.iotcd.net'
export const URL_PREFIX = 'http://h5-test-tfhzt.iotcd.net/#'
export const URL_PREFIX3 = 'https://m.elong.com/hotel/entry/gzww'//酒店预定地址
// 统一h5 跳转函数
export const jumpToWebView = async ({ url, needLogin = false, ...data }, navigation) => {
  try {
    const needAdd = !(url && url.startsWith('http'))
    const realData = {
      ...data,
      needLogin,
      url: needAdd ? (URL_PREFIX + url) : url
    }

    if (!needLogin) {//如果needLogin 为true  那么不用登陆 直接跳转
      global?._navigate('webView', realData)
      return
    }

    const token = await deviceStorage.get('token')
    if (!token) {//没有登陆得话 先进行登陆
      global?._navigate('login')
    } else {
      global?._navigate('webView', realData)
    }
  } catch (e: any) {
    showMessage(e?.message)
    console.log(e.toString());
  }
};

// 正确的url
export const isUrl = (url) => {
  const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/
  return reg.test(url)
}

//获取当前经纬度
export const getCurrentPosition = async () => {
  return new Promise((res, rej) => {
    Geolocation.getCurrentPosition(info => res(info), err => res(err));
  })
}

// 距离转换函数
export const distanceTransform = (value) => {
  if (value < 1000) {
    return value.toFixed(1) + '米'
  } else if (value >= 1000) {
    return (Math.round(value / 100) / 10).toFixed(1) + "千米"
  }
}


// 处理手机号用于展示
export const phoneToPlay = (phone) => {
  if (phone && phone.length === 11) {
    return String(phone).replace(/(\d{3})\d*(\d{4})/, "$1****$2")
  }
  return phone
}

let showKey = ''

export const showMessage = (data) => {
  // console.log(data,(typeof data === 'object')?data:{text:data,duration:1000});
  const realData = (typeof data === 'object') ? data : { text: data, duration: 1000 }
  if (realData.text === 'Network request failed') {
    realData.text = '网络异常'
  }
  showKey && Toast.hide(showKey)
  showKey = Toast.show(realData)
}

export const developingMsg = '该功能正在开发中~'

var loadingKey = '';

// 显示 modal loading
export function showLoading(text, duration) {
  loadingKey = Toast.show({
    text: text,
    icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
    duration: duration ? duration : 6000,
  });
}

// 隐藏 modal loading
export function loadingHide() {
  if (loadingKey) {
    Toast.hide(loadingKey);
    loadingKey = '';
  }
}


// 导航到路由
// export const navigateTo = (navigation, navName, param, verifyUser) => {
//   // 需要验证用户登录
//   if (verifyUser) {
//     let { userData } = app._store.getState().global;
//     if (userData && userData.id && userData.code) {
//       navigation.push(navName, param);
//     } else {
//       navigation.push("Login", { from: navName, param: param });
//     }
//   } else {
//     navigation.push(navName, param);
//   }

// };


/**
 * 下载图片并保存
 * @param uri  图片地址
 * @returns {*}
 */
export const downloadImage = (uri) => {
  if (!uri) return null;
  return new Promise((resolve, reject) => {
    let timestamp = (new Date()).getTime();//获取当前时间错
    let random = String(((Math.random() * 1000000) | 0))//六位随机数
    let dirs = RNFS.ExternalDirectoryPath; //外部文件，共享目录的绝对路径（仅限android）
    const downloadDest = `${dirs}/${timestamp + random}.jpg`;
    const formUrl = uri;
    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: (res) => { },
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise.then(res => {
        var promise = CameraRoll.save(downloadDest);
        promise.then(function (result) {
          console.log('保存成功');
          Toast.message('保存成功');
        }).catch(function (error) {
          console.log('error', error);
          Toast.message('保存失败');
        });
        resolve(res);
      }).catch(err => {
        reject(new Error(err))
      });
    } catch (e) {
      reject(e)
    }
  });

}




export const patterns = {
  url: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/,//正确的地址
  mobile: /^1\d{10}$/,
  telCode: /^0[0-9]{2,3}$/,//固定电话-区号
  telNumber: /^[0-9]{7,8}$/,//固定电话-号码
  password: /^([a-zA-Z0-9~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]){6,20}$/,
  email: /^[a-zA-Z0-9]+([-_.]+[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.]+[a-zA-Z0-9]+)*[.]([a-zA-Z]{2,4})$/, //普通电子邮件验证
  name: /^(?:[\u4e00-\u9fa5]+)(?:·[\u4e00-\u9fa5]+)*$|^[a-zA-Z]+\s?[·()a-zA-Z]*[a-zA-Z]+$/, //姓名，全英文或全汉字
  nation: /^[\u4E00-\u9FA5]+$/,//民族， 只能输入汉字
  numberHeading: /^[0-9a-zA-Z]{2}/, //编号抬头
  typeName: /^[a-zA-Z\u4e00-\u9fa5]+$/,//类别名称，只允许输入中文和英文
  postId: /^\d{7}$/, //岗位ID
  postName: /^[a-zA-Z0-9\u4e00-\u9fa5]+$/,//岗位名称
  address: /(^$)|(^[\u4E00-\u9FA5a-zA-Z0-9_\-，（）\&\.\,\(\)\/· ]{1,100}$)/, //地址
  number: /^[\d]*$/, //只能输入数字，用于电话号码模糊查询
  rental: /^[a-zA-Z\u4e00-\u9fa5]+$/, //只能输入中文或者英文，用于计量单位
  otherPhone: /^((1[0-9]{10})|(0[0-9]{2,3}-[0-9]{7,8}))$/,//其他类型电话，用于用户管理
  whitespace: /^[\S]*$/g, // 不能包含空格
  idCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/,//身份证验证
  priceReg: /(^[1-9]{1}[0-9]{0,2}(\.\d{1})?$)|(^0(\.\d{1})?$)/,
  publisher: /^[\u4e00-\u9fa5a-zA-Z0-9]+$/, // 发布单位 / 位置补充
  SSID: /^([\w\u4E00-\u9FA5]+)+$/,//ssid 用于wifi管理页
  fileName: /(^$)|(^[\u4E00-\u9FA5a-zA-Z0-9_\-“”（）\"\(\)]{1,50}$)/,//文件名字
  projectName: /(^$)|(^[\u4E00-\u9FA5a-zA-Z（）\(\)]{1,50}$)/,//项目名称
  projectInput: /^[0-9\u4e00-\u9fa5]+$/,//中文或者数字
  docName: /[:?<>"\|\\\/\*]+/,//文档名字
};

// 默认分页配置
export const pageSize = 5








