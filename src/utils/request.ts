import deviceStorage from './deviceStorage.js';
import { showMessage } from '@/utils/utils';

export const version = '1.1.4';
// 请求地址
// 正式
// export const requestUrl = 'https://api-hzt.iotcd.net';
// 测试
export const requestUrl = 'http://47.108.85.187:18710';
// 开发
// export const requestUrl = 'http://gateway.iotcd.net:18710';
// export const requestUrl = 'http://192.168.111.57:8080';

// 请求
export const request: (url: string, originData: Record<string | number, any>) => Promise<any> = function (url, originData) {
  const { method = 'GET', data, qs, headers = {} } = originData;
  return new Promise(async function (resolve, reject) {
    let token;
    let ContentType =
      method === 'GET'
        ? 'application/x-www-form-urlencoded;'
        : 'application/json';
    const options: Record<string, any> = {
      method,
      headers: {
        'Content-Type': ContentType,
        ...headers,
        'System-Type': 'SELF_MANAGE_SYSTEM',
      },
    };
    if (qs) {
      url = `${url}?${toQueryString(qs)}`
    }
    if (['DELETE', 'POST', 'PUT'].includes(method) && data) {
      options.body = JSON.stringify(data);
    }

    try {
      token = await deviceStorage.get('token');
      options.headers['Access-Token'] = token;
    } catch (e: any) {
      console.log(e?.toString());
    }
    let realUrl = url;
    // 没有http
    if (realUrl.indexOf('http') == -1) {
      realUrl = requestUrl + realUrl;
    }
    // console.log('--------url---------');
    // console.log(realUrl);
    // console.log('------options--------');
    // console.log(options);
    // console.log('--------navigate-------');
    // 					console.log(navigate('login'));
    fetch(realUrl, options)
      .then(async (response) => {
        // console.log('-----response-----');
        // console.log(response);

        const contentType = response.headers.get('Content-Type');
        // console.log('-------contentType------');
        // console.log(contentType);
        if (contentType && contentType.match(/application\/json/i)) {
          const json = await response.json();
          // console.log(json);
          // console.log(json.code);
          // console.log(JSON.stringify(json));
          if (json.code >= 500 && json.code < 600) {
            showMessage(json.message);
            reject(new Error(json.message));
          }
          if (json.code === 401) {
            const refreshToken = await deviceStorage.get('refreshToken');
            const { code, data, message } = await request(
              '/self-operated-user-center-server/applet/refresh-token/' +
              refreshToken,
              {},
            );
            // console.log('------------- code, data, message--------------');
            // console.log( code, data, message);
            if (code === 401001 || !data) {
              global._dva &&
                (await global._dva.dispatch({
                  type: 'login/logout',
                  payload: {},
                }));
              global._navigate && (await global._navigate('login'));
              reject(new Error(message));
              return;
              // Toast.show({text:message})
            }
            await deviceStorage.save('token', data);
            global._dva &&
              (await global._dva.dispatch({
                type: 'user/updateUserData',
                payload: {
                  token: data,
                },
              }));
            resolve(await request(url, originData));
          }

          resolve(json);
        }

        // console.log("---------------url-----------------");
        // console.log("--------------------------------");
        // console.log(url);
        // console.log(response.json());
        return response;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
        //todo error
      });
  }).catch((v) => {
    console.log('error', v, v.message);
    showMessage(v && v.message);
    return v;
  });
};

// 将对象转化为'application/x-www-form-urlencoded;'
export function toQueryString(obj) {
  return obj
    ? Object.keys(obj)
      .sort()
      .map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
          return val
            .sort()
            .map(function (val2) {
              return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            })
            .join('&');
        }

        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      })
      .join('&')
    : '';
}
