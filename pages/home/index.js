// pages/home/index.js
import dayjs from 'dayjs';
import { Loading } from '~/components/custom-loading/loading.js';
import { haloBaseUrl } from '~/config/index';
import { isExternal } from '~/utils/util';
import PostsService from '~/api/posts-service';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 1, // 轮播图默认下标
    posterList: [
      {
        id: '1',
        image:
          'https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp',
      },
      {
        id: '2',
        image:
          'https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp',
      },
      {
        id: '3',
        image:
          'https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp',
      },
      {
        id: '4',
        image:
          'https://upload-images.jianshu.io/upload_images/5569035-e4f6f233d44aba8b.png?imageMogr2/auto-orient/strip|imageView2/2/w/378/format/webp',
      },
    ],
    banners: [], // 轮播图
    statisticsInfo: null, // 博客统计信息
    articleList: [], // 文章列表
    title: '只会番茄炒蛋的博客', // 标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
   * @method haloGetApiContentPosts 获取halo博客文章
   * @param {*} params
   */
  haloGetApiContentPosts(params) {
    return new Promise(async (reslove) => {
      try {
        const { page, sort, size } = params;
        const response = await PostsService.haloGetApiContentPosts({
          page,
          sort,
          size,
        });
        const { content } = response;
        content.forEach((item) => {
          item.createTime = dayjs(item.createTime).format('YYYY-MM-DD');
          if (item.thumbnail) {
            item.thumbnail = isExternal(item.thumbnail) ? item.thumbnail : haloBaseUrl + item.thumbnail;
          }
        });
        reslove(response);
      } catch (error) {
        console.error('========================👇 请求错误 👇========================\n\n', error, '\n\n');
      }
    });
  },

  /**
   * @method initData 初始化数据
   */
  async initData() {
    Loading.show();
    const { content } = await this.haloGetApiContentPosts({
      page: 0,
      sort: 'topPriority,createTime,desc',
      size: 10,
    });
    this.setData(
      {
        articleList: content,
      },
      () => {
        Loading.clear();
      }
    );
  },
});
