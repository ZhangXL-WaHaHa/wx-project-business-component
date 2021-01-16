// pages/book-keep/modify-user/index.js
import data from "../data"
import event from "../event"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    day: '', //周几
    showPrice: false,  //是否显示价格弹出框
    priceList: [], //价格数据
    memberList: [], //成员数据
    member_price_list: [], //今日账单数据
    dayList: [
      {
        name: '中午',
        prod: 'noon'
      },
      {
        name: '晚上',
        prod: 'night'
      }
    ],  //一天的字段
    tableHead: [{
      name: '名字',
      prod: 'name',
      type: 'text',
      width: '150rpx'
    },
    {
      name: '价格(中午)',
      prod: 'noon_price',
      type: 'select',
      width: '150rpx'
    },
    {
      name: '价格(晚上)',
      prod: 'night_price',
      type: 'select',
      width: '150rpx'
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存中的数据
    this.getStoragePrice()
    this.getStorageUser()

    // 获取今天是周几
    this.formatWeekToday()

    // 获取今天的账单缓存(从一周的缓存中获取)
    this.getStorageWeekBill()
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
   * 设置今天是周几
   */
  formatWeekToday() {
    this.setData({
      day: data.week[new Date().getDay()]
    })
  },

  /**
   * 获取缓存中的成员数据
   */
  getStorageUser() {
    event.getStorage('order_user').then(res => {
      this.data.memberList = res
    }).catch(error => {
      this.data.memberList = data.memberInfo
    })
  },

  /* 获取缓存中的价格数据 */
  getStoragePrice() {
    event.getStorage('order_price').then(res => {
      this.setData({
        priceList: res
      })
    }).catch(() => {
      this.setData({
        priceList: data.priceInfo
      })
    })
  },

  /**
   * 获取今天的账单信息（从本周的账单缓存中获取）
   */
  getStorageWeekBill() {
    event.getStorage('order_week').then(res => {
      // 遍历本周账单信息，找到对应的今日账单
      for(let i in res) {
        if(i === this.data.day) {
          // this.setData({
          //   member_price_list: res[i]
          // })
          this.data.member_price_list = res[i]
        }
      }
      // 格式化当前的账单信息
      this.formatOrderBill()
    })
  },

  /**
   * 格式化今日账单信息
   */
  formatOrderBill() {
    // 今日账单为空
    if(this.data.member_price_list.length === 0) {
      // 格式化成员数据，添加
      this.data.memberList.forEach(item => {
        this.data.member_price_list.push({
          name: item.name,
          noon_price: '-',
          night_price: '-'
        })
      })
      this.setData({
        member_price_list: this.data.member_price_list
      })
      return
    }

    // 判断是否存在新添加的成员
    this.data.memberList.forEach(item => {
      let add_flag = false
      this.data.member_price_list.forEach(array => {
        if(item.name === array.name) {
          add_flag = true
        }
      })

      if(!add_flag) {
        this.data.member_price_list.push({
          name: item.name,
          noon_price: '-',
          night_price: '-'
        })
      }
    })
    this.setData({
      member_price_list: this.data.member_price_list
    })
  },

  /**
   * 点击保存(暂时将订单保存起来)
   */
  saveBill() {
    // 获取缓存中本周的订单信息
    event.getStorage('order_week').then(res => {
      event.setStorage({
        ...res,
        [`${this.data.day}`]: this.data.member_price_list
      }, 'order_week').then(res => {
        wx.navigateBack()
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
      })
    })
  },

  /**
   * 关闭弹框
   */
  onClose() {
    this.setData({
      showPrice: false
    })
  },

  /**
   * 选择了价格
   */
  showPrice(e) {
    // 设置当前选中的商品价格
    this.index = e.detail.index
    this.key = e.detail.key

    // 显示弹框
    this.setData({
      showPrice: true
    })
  },

  /**
   * 选中了价格
   */
  selectPrice(e) {
    // 设置选中的价格
    this.setData({
      [`member_price_list[${this.index}].${this.key}`]: e.detail.name
    })
  }
})