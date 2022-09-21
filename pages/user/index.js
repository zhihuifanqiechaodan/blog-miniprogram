// pages/user/index.js
import Toast from '@vant/weapp/toast/toast';
import dayjs from 'dayjs';
import { haloBaseUrl } from '~/config/index';
import { isExternal } from '~/utils/util';
import UsersService from '~/api/users-service';
import StatisticsService from '~/api/statistics-service';
const { globalData } = getApp();

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    _refreshInfo: null, // 刷新详情
  },
  /**
   * 页面的初始数据
   */
  data: {
    title: '账户信息',
    userInfo: null, // 用户信息
    brokenNetwork: false, // 网络状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * @method haloGetApiContentUsersProfile 获取halo博客博主信息
   */
  haloGetApiContentUsersProfile() {
    return new Promise(async (reslove, reject) => {
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
        globalData.userInfo = response;
        reslove(response);
      } catch (error) {
        Toast.clear();
        this._data._refreshInfo = {
          method: 'initData',
          params: {},
        };
        this.setData({
          brokenNetwork: true,
        });
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },

  /**
   * @method haloGetApiContentStatistics 获取halo博客统计信息
   */
  haloGetApiContentStatistics() {
    return new Promise(async (reslove, reject) => {
      try {
        const response = await StatisticsService.haloGetApiContentStatistics();
        reslove(response);
      } catch (error) {
        Toast.clear();
        this._data._refreshInfo = {
          method: 'initData',
          params: {},
        };
        this.setData({
          brokenNetwork: true,
        });
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },

  /**
   * @method initData 初始化数据
   */
  async initData() {
    const userInfo = await this.haloGetApiContentUsersProfile();
    const statisticsInfo = await this.haloGetApiContentStatistics();
    this.setData({
      userInfo,
      statisticsInfo,
    });
  },
});
