// components/custom-iconfont/index.js
Component({
  externalClasses: ['external-iconfont'],
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      optionalTypes: [String, Number],
      value: '28rpx',
    },
    icon: {
      type: String,
      value: '',
    },
    color: {
      type: String,
      value: '#031c24',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
});
