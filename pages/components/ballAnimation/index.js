// pages/components/ballAnimation/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 小球的唯一表示
    ballIndex: {
      type: Number,
      value: -1
    }
  },

  observers: {
    "ballIndex": function(newValue) {
      console.log(newValue)
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hide_good_box: true 
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 开启小球动画
    // 需要参数: 小球运动关键帧
    // 创建两种同时进行的动画实现小球动画和购物车动画的无缝连接
    startAnimation(keyFrames) {
      this.setData({
        hide_good_box: false
      })
      
      this.animate(`#good_box-${this.properties.ballIndex}`, keyFrames, 200, function() {
        // this.setData({
        //   hide_good_box: true
        // })
        // // 回调
        // this.triggerEvent("endAnimation", this.properties.ballIndex)
        // // 清除good_box动画
        // this.clearAnimation(".good_box")
      }.bind(this))

      // 同时创建两种动画
      this.animate(".noExistent", [
        { opacity : 0},
        { opacity: 1}
      ], 420, function () {
        this.setData({
          hide_good_box: true
        })
        this.triggerEvent("endAnimation", this.properties.ballIndex)
        // 清除good_box动画
        this.clearAnimation(`#good_box-${this.properties.ballIndex}`)
      }.bind(this))
    }
  }
})
