// pages/long-list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //测试视频列表
    videoList: [
      {
        "typeid": 1,
        "videoimg": "../../images/p001.png",
        "videoname": "测试视频1",
        "videourl": "https://media.w3.org/2010/05/sintel/trailer.mp4"
      },
      {
        "typeid": 2,
        "videoimg": "../../images/p002.png",
        "videoname": "测试视频2",
        "videourl": "http://www.w3school.com.cn/example/html5/mov_bbb.mp4"
      },
    ],

    viewoScrollToIndex: 0, // 长列表滚动项
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
 * 开始点击
 */
  clickStart(e) {
    console.log('开始点击==>', e)
  },

  /**
   * 开始移动
   */
  move(e) {
    console.log('移动==>', e)
  },

  /**
   * 停止
   */
  clickStop(e) {
    const index = ++e.currentTarget.dataset.index
    console.log('停止点击==>', e, index)

    if (index >= this.data.videoList.length) { return }

    this.setData({ videoScrollToIndex: index })
  }
})