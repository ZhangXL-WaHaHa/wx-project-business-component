// pages/api-use/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 设置wifi信息
     */
    wifiInfo: {
      name: '',
      password: ''
    }
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
   * 点击一键连接wifi
   * 使用微信中wifi相关的api（https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.stopWifi.html）
   */
  oneClickLinkWifi() {
    // 初始化wifi
    wx.startWifi({
      success: (res) => {
        console.log('初始化成功==>', res)
        this.connectWifi()
      },
    })
  },

  /**
   * 链接wifi
   * 使用connectWifi接口（https://developers.weixin.qq.com/miniprogram/dev/api/device/wifi/wx.connectWifi.html）
   */
  connectWifi() {
    wx.connectWifi({
      SSID: this.data.wifiInfo.name,
      password: this.data.wifiInfo.password,
      success: res => {
        console.log('链接wifi成功==>', res)
        this.monitor()
      },
      fail: error => {
        console.log('链接wifi失败==>', error)
      }
    })
  },

  /**
   * 监听链接的wifi事件
   * 使用
   */
  monitor() {
    wx.onWifiConnected((result) => {console.log('输出wifi事件==>', res)})
  }
})