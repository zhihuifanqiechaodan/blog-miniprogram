// packageA/article-detail/index.js
import dayjs from 'dayjs';
import { haloBaseUrl } from '~/config/index';
import { getUserInfo, isExternal } from '~/utils/util';
import PostsService from '~/api/posts-service';
import { Loading } from '~/components/custom-loading/loading';

Page({
  /**
   * 页面的私有数据，不涉及到页面渲染的数据
   */
  _data: {
    id: '', // 文章id
  },
  /**
   * 页面的初始数据
   */
  data: {
    articleInfo: null, // 文章详情
    userInfo: null, // 博主信息
    title: '', // 标题
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    this._data.id = id;
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
  onShareAppMessage: function () {
    const { articleInfo } = this.data;
    const { thumbnail, title } = articleInfo;
    return {
      title,
      imageUrl: thumbnail,
    };
  },

  /**
   * 监听用户滑动页面事件
   */
  onPageScroll(e) {
    const { scrollTop } = e;
    const { title, articleInfo } = this.data;
    if (scrollTop > 20 && !title) {
      this.setData({
        title: articleInfo.title,
      });
    }
    if (scrollTop <= 20 && title) {
      this.setData({
        title: '',
      });
    }
  },

  /**
   * @method haloGetApiContentStatistics 获取halo博客文章
   */
  haloGetApiContentPosts() {
    return new Promise(async (reslove) => {
      try {
        const { id } = this._data;
        const response = await PostsService.haloGetApiContentPosts(
          {
            formatDisabled: false,
            sourceDisabled: true,
          },
          id
        );
        const { thumbnail, createTime } = response;
        response.createTime = dayjs(createTime).format('YYYY-MM-DD');
        if (thumbnail) {
          response.thumbnail = isExternal(thumbnail) ? thumbnail : haloBaseUrl + thumbnail;
        }
        reslove(response);
      } catch (error) {
        console.log(error);
      }
    });
  },
  /**
   * @method initData 初始化数据
   */
  async initData() {
    Loading.show();
    const userInfo = await getUserInfo();
    const articleInfo = await this.haloGetApiContentPosts();
    this.setData(
      {
        articleInfo,
        userInfo,
      },
      () => {
        Loading.clear();
      }
    );
  },
});
