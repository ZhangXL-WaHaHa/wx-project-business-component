// pages/book-keep/modify-user/index.js
import data from "../data"
import event from "../event"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberList: [],
    addMemberInfo: '',  //添加的成员名字
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
          memberList: res.data
        })

      },
      fail: error => {
        console.log('获取缓存中的数据失败==>', error)
        this.setData({
          memberList: data.memberInfo
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
      if (item.name === this.data.addMemberInfo) {
        wx.showToast({
          title: '已经有该名字成员',
          icon: 'none'
        })
        add_flag = false
      }
    })
    if (add_flag) {
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
  },

  /* 点击删除 */
  delete(e) {
    wx.showModal({
      title: '操作提示',
      content: '是否删除该成员',
      success: res => {
        if(res.confirm) {
          this.data.memberList.splice(e.detail.index, 1)
          this.setData({
            memberList: this.data.memberList
          })
          // 更新
          event.setStorage('order_user', this.data.memberList)
        }
      }
    })
  },

  /* 点击修改 */
  modify(e) {
    this.setData({
      ['tableHead[0].type']: 'input'
    })
  }
})