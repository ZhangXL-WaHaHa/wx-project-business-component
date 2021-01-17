// pages/book-keep/modify-user/index.js
import data from "../data"
import event from "../event"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    priceList: [],
    addPrice: '',  //添加的价格
    tableHead: [
      {
        name: '价格',
        prod: 'price',
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

  /* 获取缓存中的价格数据 */
  getStorageUser() {
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

  /* 输入价格 */
  inputMemberInfo(e) {
    this.data.addPrice = parseFloat(e.detail.value)
  },

  // 点击添加价格
  addMember() {
    if(this.data.addPrice === '') {
      wx.showToast({
        title: '请输入价格',
        icon: 'none'
      })
      return
    }
    let add_flag = true
    // 不能出现相同名字的成员
    this.data.priceList.forEach(item => {
      if (item.price === this.data.addPrice) {
        wx.showToast({
          title: '已经有了改价格',
          icon: 'none'
        })
        add_flag = false
      }
    })
    if (add_flag) {
      this.data.priceList.push({
        price: this.data.addPrice,
        name: this.data.addPrice
      })
      event.setStorage(this.data.priceList, 'order_price').then(() => {
        this.setData({
          addPrice: '',
          priceList: this.data.priceList
        })
      }).catch(() => {})
    }
  },

  /* 点击删除 */
  delete(e) {
    wx.showModal({
      title: '操作提示',
      content: '是否删除该价格',
      success: res => {
        if(res.confirm) {
          this.data.priceList.splice(e.detail.index, 1)
          this.setData({
            priceList: this.data.priceList
          })
          // 更新
          event.setStorage(this.data.priceList, 'order_price')
        }
      }
    })
  }
})