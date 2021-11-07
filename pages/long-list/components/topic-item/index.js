// pages/long-list/components/topic-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 第几组
     */
    groupIndex: {
      type: Number,
      value: 0
    },
    
    /**
     * 第几个
     */
    index: {
      type: Number,
      value: 0
    },

    /**
     * 话题信息
     */
    topic: {
      type: Object,
      value: {
        src: ''
      }
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
