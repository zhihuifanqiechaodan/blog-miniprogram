import { apiAccessKey } from '~/config/index';
import { version } from '~/config/index';

/**
 * 按照下述例子继续封装项目中需要的上传功能等等，封装两种 一种用于携带用户信息，一种用于原生
 */

/**
 * @method _request 封装业务请求
 * @param {*} { method, url, data }
 */
const _request = async ({ method, url, data }) => {
  const { globalData } = getApp();
  const { isConnected } = globalData;
  data.api_access_key = apiAccessKey;
  const header = {};
  return new Promise((resolve, reject) => {
    if (isConnected) {
      // 微信原生请求
      wx.request({
        url,
        data,
        method,
        header,
        success: async (value) => {
          const { statusCode, data: response } = value;
          if (statusCode === 200) {
            const { status, data } = response;
            switch (status) {
              case 200:
                resolve(data);
                break;

              default:
                break;
            }
          } else {
            reject(`服务请求错误，状态码：${statusCode}`);
          }
        },
        fail(reason) {
          reject(reason);
        },
      });
    } else {
      reject('无网状态');
    }
  });
};

/**
 * @method _nativeRequest 封装原生请求
 * @param {*} { method, url, data }
 */
const _nativeRequest = async ({ method, url, data }) => {
  const { globalData } = getApp();
  const { isConnected } = globalData;
  return new Promise((resolve, reject) => {
    if (isConnected) {
      // 微信原生请求
      wx.request({
        url,
        data,
        method,
        success: async (value) => {
          const { data, statusCode } = value;
          if (statusCode === 200) {
            resolve(data);
          } else {
            reject(`服务请求错误，状态码：${statusCode}`);
          }
        },
        fail(reason) {
          reject(reason);
        },
      });
    } else {
      reject('无网状态');
    }
  });
};

/**
 * @method post 业务post请求
 * @param {*} { url, data }
 */
export const post = ({ url, data }) => _request({ method: 'POST', url, data });

/**
 * @method get 业务get请求
 * @param {*} { url, data }
 */
export const get = ({ url, data }) => _request({ method: 'GET', url, data });

/**
 * @method nativePost 原生post请求
 * @param {*} { url, data }
 */
export const nativePost = ({ url, data }) => _nativeRequest({ method: 'POST', url, data });
