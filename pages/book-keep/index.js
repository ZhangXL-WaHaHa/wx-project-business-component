// pages/book-keep/index.js
import data from "data.js"
import event from "event.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [], //参与记账单的信息
    addMemberInfo: '', //添加的成员信息
    day: '', //当前是星期几

    member: [], //成员信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.memberList = data.memberInfo

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
    // 获取缓存中的本周订单信息，设置判断订单是否过期
    this.getStorageOrderList()
  },

  /**
   * 判断缓存中的订单信息是否已经过期
   */
  getStorageOrderList() {
    // 获取本周订单过期时间
    const endTimeStamp = this.getExpireTime()
    event.getStorage('order_week').then(res => {
      // 获取当前的时间戳
      const nowTimeStamp = new Date().getTime()
      if (res.exprie_at < nowTimeStamp) {
        // 账单已经过期，清空当前缓存中的账单
        event.setStorage({
          exprie_at: endTimeStamp
        }, 'order_week')
      }
    }).catch(error => {
      // 没有缓存，设置当前缓存订单中的过期时间
      const week_bill = {
        exprie_at: endTimeStamp
      }
      event.setStorage(week_bill, 'order_week')
    })
  },

  /**
   * 获取本周账单的过期时间
   * @returns(Number) 过期时间戳
   */
  getExpireTime() {
    const now_date = new Date()
    // 获取今天是周几
    const day = now_date.getDay()
    // 获取今天的时间戳
    const year = now_date.getFullYear()
    const month = now_date.getMonth() + 1
    const date = now_date.getDate()
    const nowTimeStamp = new Date(`${year}/${month}/${date} 23:59:59`).getTime()
    // 获取今天距离周日的时间戳
    const timeStamp = day === 0 ? 0 : (7 - day) * 24 * 60 * 60 * 1000

    console.log('输出当前的时间==>', day, year, month, date, `${year}/${month}/${date}`, nowTimeStamp)
    return nowTimeStamp + timeStamp
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

  /* 操作成员信息 */
  showMemberInfo() {
    wx.navigateTo({
      url: 'modify-user/index',
    })
  },

  /* 操作价格信息 */
  showPriceInfo() {
    wx.navigateTo({
      url: 'modify-price/index',
    })
  },

  /**
   * 设置今日账单
   */
  settingTodayBill() {
    wx.navigateTo({
      url: 'today-bill/index'
    })
  },

  /**
   * 操作本周订单信息
   */
  showWeekBill() {
    wx.navigateTo({
      url: 'week-bill/index',
    })
  },

    
  /**
   * 手动清空账单信息（上周的账单这周才开始算，导致账单变为这周的账单）
   */
  emptyInfo() {
    event.setStorage({
      exprie_at: endTimeStamp
    }, 'order_week')
  }
})