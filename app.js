// app.js
import dayjs from 'dayjs';
import { env, haloBaseUrl, log } from '~/config/index';
import { Home } from './utils/router';
import { isExternal, reLaunch } from './utils/util';
import StatisticsService from '~/api/statistics-service';
import UsersService from '~/api/users-service';

App({
  onLaunch() {
    log && console.log(`========================👇 ${env}环境 👇========================\n\n`, env, '\n\n');

    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    const updateManager = wx.getUpdateManager();
    // 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        showCancel: false,
        success: () => {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        },
      });
    });

    // 获取网络类型
    wx.getNetworkType({
      success: (value) => {
        const { networkType } = value;
        this.globalData.networkType = networkType;
        if (networkType === 'none') {
          this.globalData.isConnected = false;
        } else {
          this.globalData.isConnected = true;
        }
        log && console.log('========================👇 网路类型 👇========================\n\n', networkType, '\n\n');
      },
    });

    // 获取设备信息
    const systemInfo = wx.getSystemInfoSync();

    // 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
    const menuButton = wx.getMenuButtonBoundingClientRect();

    // 存储胶囊布局信息
    systemInfo.menuButton = menuButton;

    // 自定义navbar高度等于safeArea.top加上var-navbar固定高度46
    systemInfo.navbarHeight = systemInfo.statusBarHeight + 46;

    // 底部安全距离区域
    systemInfo.safeAreaInsetBottom = systemInfo.screenHeight - systemInfo.safeArea.height - systemInfo.safeArea.top;

    // 全局存储设备信息
    this.systemInfo = systemInfo;
  },

  onShow() {
    // 监听网络状态变化事件
    wx.onNetworkStatusChange((value) => {
      const { isConnected, networkType } = value;
      this.globalData.networkType = networkType;
      this.globalData.isConnected = isConnected;
      log && console.log('========================👇 网络类型 👇========================\n\n', networkType, '\n\n');
      log && console.log('========================👇 网络状态 👇========================\n\n', isConnected, '\n\n');
    });

    wx.onMemoryWarning(function () {
      log && console.log('========================👇 onMemoryWarningReceive 👇========================\n\n');
    });

    wx.nextTick(async () => {
      const userInfo = await this.haloGetApiContentUsersProfile();
      const statisticsInfo = await this.haloGetApiContentStatistics();
      this.globalData.userInfo = Object.assign(userInfo, statisticsInfo);
    });
  },

  /**
   * @method onPageNotFound 页面不存在监听函数
   */
  onPageNotFound() {
    reLaunch({
      url: Home.path,
    });
  },

  /**
   * @method haloGetApiContentUsersProfile 获取halo博客博主信息
   */
  haloGetApiContentUsersProfile() {
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
  },

  /**
   * @method haloGetApiContentStatistics 获取halo博客统计信息
   */
  haloGetApiContentStatistics() {
    return new Promise(async (reslove) => {
      try {
        const response = await StatisticsService.haloGetApiContentStatistics();
        reslove(response);
      } catch (error) {
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },

  globalData: {
    networkType: '',
    isConnected: true,
    userInfo: null,
  },
  systemInfo: null, // 设备信息
});
