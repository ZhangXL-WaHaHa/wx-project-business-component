// pages/download-file/index.js

const CACHE_PATH = wx.env.USER_DATA_PATH + '/mini_business_components'  //缓存到本地的路径

import download from "./download"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    file: '',  //文件的链接
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

  // 下载并保存文件到某一目录下
  downloadFile() {
    download.downLoad(CACHE_PATH, this.data.file)
  }
})