// pages/book-keep/index.js
import data from "data.js"
import event from "event.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],  //参与记账单的信息
    addMemberInfo: '',  //添加的成员信息
    day: '',  //当前是星期几
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.memberList = data.memberInfo

    // 获取当前时间为本周的星期几
    this.data.day = data.week[new Date().getDay()]


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
    // 获取缓存中的用户信息
    this.getStorageMember()
  },

  /* 获取缓存中的用户信息 */
  getStorageMember() {
    wx.getStorage({
      key: 'order_user',
      success: res => {
        console.log('本地获取成功==>', res)
        this.data.memberList = res.data
      },
      fail: error => {
        this.data.memberList = data.memberInfo
      }
    })
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

  /* 输入成员名字 */
  inputMemberInfo(e) {
    // console.log('成员信息==>', e)
    this.data.addMemberInfo = e.detail.value
  },

  // 点击添加成员
  addMember() {
    let add_flag = true
    // 不能出现相同名字的成员
    this.data.memberList.forEach(item => {
      if(item.name === this.data.addMemberInfo) {
        wx.showToast({
          title: '已经有该名字成员',
          icon: 'none'
        })
        add_flag = false
      }
    })
    if(add_flag) {
      this.data.memberList.push({
        name: this.data.addMemberInfo
      })
      event.setStorage(this.data.memberList, 'order_user').then(() => {
        this.setData({
          addMemberInfo: ''
        })
      }).catch(() => {

      })
    }
  }
})