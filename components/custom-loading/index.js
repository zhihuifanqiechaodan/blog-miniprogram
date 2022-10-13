// components/custom-loading/custom-loading.js
import lottie from 'lottie-miniprogram';
const { systemInfo } = getApp();

Component({
  options: {
    pureDataPattern: /^_/,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      // loading状态
      type: Boolean,
      value: false,
    },
  },

  observers: {
    loading(loading) {
      const { _loadAnimationInstance } = this.data;
      if (_loadAnimationInstance) {
        loading ? _loadAnimationInstance.play() : _loadAnimationInstance.pause();
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    systemInfo, // 设备信息
    _loadAnimationInstance: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @method initData 初始化数据
     */
    initData() {
      this.createSelectorQuery()
        .select('#canvas')
        .node((res) => {
          const canvas = res.node;
          const context = canvas.getContext('2d');
          canvas.width = systemInfo.windowWidth;
          canvas.height = systemInfo.windowHeight;
          lottie.setup(canvas);
          const _loadAnimationInstance = lottie.loadAnimation({
            loop: true,
            autoplay: true,
            animationData: require('~/assets/lotties/9844-loading-40-paperplane'),
            rendererSettings: {
              context,
            },
          });
          this.setData({ _loadAnimationInstance });
        })
        .exec();
    },
  },

  lifetimes: {
    attached() {
      this.initData();
    },
  },
});
