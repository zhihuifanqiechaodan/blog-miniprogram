// pages/home/components/banner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    articleList: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: 1, // 轮播图默认下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method swiperChange 轮播图切换
     * @param {*} event
     */
    swiperChange(event) {
      const { current } = event.detail;
      this.setData({
        currentIndex: current,
      });
    },
  },
});
