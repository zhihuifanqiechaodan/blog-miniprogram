import Toast from '@vant/weapp/toast/toast';
import StatisticsService from '~/api/statistics-service';
import UsersService from '~/api/users-service';
import dayjs from 'dayjs';
import { haloBaseUrl } from '~/config/index';

/**
 * @method haloGetApiContentUsersProfile 获取halo博客博主信息
 */
const _haloGetApiContentUsersProfile = () => {
  return new Promise(async (reslove) => {
    try {
      const response = await UsersService.haloGetApiContentUsersProfile();
      const { avatar, createTime } = response;
      response.avatar = isExternal(avatar) ? avatar : haloBaseUrl + avatar;
      response.createTime = dayjs(createTime).format('YYYY-MM-DD');
      // 级别
      response.level = '菜鸟';
      // 单位
      response.unit = '北京束一科技';
      // 介绍
      response.intro = '公众号「番茄学前端」作者';
      reslove(response);
    } catch (error) {
      console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
    }
  });
};

/**
 * @method haloGetApiContentStatistics 获取halo博客统计信息
 */
const _haloGetApiContentStatistics = () => {
  return new Promise(async (reslove) => {
    try {
      const response = await StatisticsService.haloGetApiContentStatistics();
      reslove(response);
    } catch (error) {
      console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
    }
  });
};

/**
 * @method getItemSync 缓存读取
 * @param {*} key
 */
export const getItemSync = (key) => {
  try {
    return wx.getStorageSync(key);
  } catch (err) {
    console.error('wx.getStorageSync(key)', err);
  }
};

/**
 * @method setItemSync 缓存存储
 * @param {*} key
 * @param {*} value
 */
export const setItemSync = (key, value) => {
  try {
    wx.setStorageSync(key, value);
  } catch (err) {
    console.error('wx.setStorageSync(key, value)', err);
  }
};

/**
 * @method deleteItemSync 缓存删除
 * @param {*} key
 */
export const deleteItemSync = (key) => {
  try {
    return wx.removeStorageSync(key);
  } catch (err) {
    console.error('wx.removeStorageSync(key)', err);
  }
};

/**
 * @method navigateTo 封装navigateTo请求
 * @param {*} { url, events }
 */
export const navigateTo = ({ url, events = {} }) => {
  return new Promise((resolve) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateTo({
        url,
        events,
        success: resolve,
        fail: () => {
          redirectTo({ url, events });
        },
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method redirectTo 封装redirectTo请求
 * @param {*} { url, events }
 */
export const redirectTo = ({ url, events = {} }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.redirectTo({
        url,
        events,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method navigateBack 封装navigateBack请求
 * @param {*} delta
 */
export const navigateBack = (delta = 1) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.navigateBack({
        delta,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method switchTab 封装switchTab请求
 * @param {*} { url }
 */
export const switchTab = ({ url }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.switchTab({
        url,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method reLaunch 封装reLaunch请求
 * @param {*} { url }
 */
export const reLaunch = ({ url }) => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    // 有网络
    if (isConnected) {
      wx.reLaunch({
        url,
        success: resolve,
        fail: reject,
      });

      // 无网络
    } else {
      Toast('似乎已经断开了与互联网的连接');
    }
  });
};

/**
 * @method getCurrentPageInfo 获取当前页面栈中指定路径的页面信息
 * @param {*} path app.json中定义的完整路径
 */
export const getCurrentPageInfo = (path) => {
  // 存在指定路径， 返回指定路径页面详情
  if (path) {
    // 反转数组，返回最后一次出现路由
    return getCurrentPages()
      .reverse()
      .find((item) => {
        return `/${item.route}` === path;
      });

    // 反转数组,返回当前页面详情
  } else {
    return getCurrentPages().reverse()[0];
  }
};

/**
 * @method getCurrentPageIndex 获取当前页面栈中指定路径的下标
 * @param {*} path app.json中定义的完整路径
 */
export const getCurrentPageIndex = (path) => {
  return getCurrentPages()
    .reverse()
    .findIndex((item) => {
      return `/${item.route}` === path;
    });
};

/**
 * @method checkNetwork 检查网络
 */
export const checkNetwork = () => {
  return new Promise((resolve, reject) => {
    const { globalData } = getApp();
    const { isConnected } = globalData;
    isConnected ? resolve() : Toast('似乎已经断开了与互联网的连接') && reject('似乎已经断开了与互联网的连接');
  });
};

/**
 * @method getNetworkType 获取网络类型
 */
export const getNetworkType = () => {
  return new Promise((resolve) => {
    // 获取网络类型
    wx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        resolve(networkType);
      },
    });
  });
};

/**
 * @method isExternal 外部链接判断
 * @param {string} path
 * @returns {Boolean}
 */
export const isExternal = (path) => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

/**
 * @method getUserInfo 获取用户信息
 */
export const getUserInfo = async () => {
  const { globalData } = getApp();
  const { userInfo } = globalData;
  if (userInfo) {
    return userInfo;
  } else {
    const userInfo = await _haloGetApiContentUsersProfile();
    const statisticsInfo = _haloGetApiContentStatistics();
    globalData.userInfo = Object.assign(userInfo, statisticsInfo);
    return globalData.userInfo;
  }
};
