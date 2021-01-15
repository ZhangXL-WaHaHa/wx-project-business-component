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
        type: 'text'
      },
      {
        name: '价格(中午)',
        prod: 'noon_price',
        type: 'select'
      },
	  {
	    name: '价格(晚上)',
	    prod: 'night_price',
	    type: 'select'
	  }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取缓存中的数据
    this.getStorageUser()
    this.getStoragePrice()

    // 获取今天是周几
    this.formatWeekToday()
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
      this.setData({
        memberList: res
      })
    }).catch(() => {
      this.setData({
        memberList: data.memberInfo
      })
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
   * 点击保存(暂时将订单保存起来)
   */
  savBill() {
	  
	  
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
  selectPrice(e) {
	  console.log('选择了价格==>', e)
  }
})