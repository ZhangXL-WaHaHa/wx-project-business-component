// pages/navigate-ball/components/ball/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 悬浮球一开始出现的位置
     */
    left: {
      type: String,
      value: '100rpx'
    },
    top: {
      type: String,
      value: '100rpx'
    },

    /**
     * 悬浮球的大小
     */
    width: {
      type: String,
      value: '80rpx'
    },
    height: {
      type: String,
      value: '80rpx'
    },

    /**
     * 半透明圆环宽度
     */
    border_width: {
      type: String,
      value: '16rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
