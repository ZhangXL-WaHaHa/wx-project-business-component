// pages/book-keep/modify-user/index.js
import data from "../data"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: [],
    tableHead: [
      {
        name: '名字',
        prod: 'name',
        type: 'text'
      },
      {
        name: '操作',
        prod: 'operation',
        type: 'button'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存中的用户数据
    this.getStorageUser()
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

  /* 获取缓存中的用户数据 */
  getStorageUser() {
    wx.getStorage({
      key: 'order_user',
      success: res => {
        console.log('获取缓存中的用户数据成功==>', res)
        this.setData({
          user: res.data
        })
        
      },
      fail: error => {
        console.log('获取缓存中的数据失败==>', error)
        this.setData({
          user: data.memberInfo
        })
      }
    })
  },
  
  /* 添加成员 */
  addUser() {
    
  }
})