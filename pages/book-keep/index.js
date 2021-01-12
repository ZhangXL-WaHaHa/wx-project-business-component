// pages/book-keep/index.js
import data from "data.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],  //参与记账单的信息

    day: '',  //当前是星期几

    member: [],  //成员信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.memberList = data.memberInfo

    // 获取当前时间为本周的星期几
    this.data.day = data.week[new Date().getDay()]



    console.log('输出本周时间==>', this.data.day)

    // 初始化数据
    this.initData()
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

  /* 初始化数据 */
  initData() {

  },

  // 图片解析文字 https://cloud.tencent.com/document/product/866/33526
  selectImage() {
    wx.chooseImage({
      count: 1,
			sizeType: ["compressed"],
			sourceType: ["album"],
			success: temp => {
        // console.log('回调的temp==>', temp)
        wx.request({
          url: `https://ocr.tencentcloudapi.com/`,
          data: {
            Action: 'GeneralBasicOCR',
            Version: '2018-11-19',
            ImageUrl: temp.tempFilePaths[0]
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log('输出数据==>', res.data)
          },
          fail(error) {
            console.log('解析失败==>', error)
          }
        })
      }
    })
  },

  // 点击添加成员
  addUser() {

  }
})