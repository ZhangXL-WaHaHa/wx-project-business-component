// pages/book-keep/week-bill/index.js
import data from "../data"
import event from "../event"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekOrderList: [], //本周账单
    /* 本周订单明细头部 */
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

    /* 本周订单明细 */
    week_order_detail: [{
      partake_number: '-', //参与人数
      total_order_number: '-', //订单总数
      total_order_price: '-', //订单总金额
    }],
    /* 本周订单明细头部 */
    week_order_detail_head: [{
        name: '本周参与人数',
        prod: 'partake_number',
        type: 'text',
        width: '200rpx'
      },
      {
        name: '本周总订单数',
        prod: 'total_order_number',
        type: 'text',
        width: '200rpx'
      },
      {
        name: '订单总金额',
        prod: 'total_order_price',
        type: 'text',
        width: '200rpx'
      }
    ],

    /* 本周订单总数量明细 */
    day_number_order_list: [],
    /* 本周订单总数量头部 */
    day_number_order_head: [{
        name: '姓名',
        prod: 'name',
        type: 'text',
        width: '200rpx'
      },
      {
        name: "总订单数",
        prod: 'all_order_num',
        type: 'text',
        width: '200rpx'
      },
      {
        name: '总订单金额',
        prod: 'all_order_price',
        type: 'text',
        width: '200rpx'
      }
    ],

    showModifMask: false, //是否显示修改信息框
    dayList: [{
        value: '一',
        name: '星期一'
      },
      {
        value: '二',
        name: '星期二'
      },
      {
        value: '三',
        name: '星期三'
      },
      {
        value: '四',
        name: '星期四'
      },
      {
        value: '五',
        name: '星期五'
      },
      {
        value: '六',
        name: '星期六'
      },
      {
        value: '日',
        name: '星期日'
      }
    ], //可修改的时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 重置数据
    this.emptyData()
    // 获取本周账单
    this.getStorageOrderList()
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
   * 重置数据
   */
  emptyData() {
    this.data.weekOrderList = [],
      this.data.week_order_detail = [{
        partake_number: '-', //参与人数
        total_order_number: '-', //订单总数
        total_order_price: '-', //订单总金额
      }],
      this.data.day_number_order_list = [],
      this.data.dayList = []
  },

  /**
   * 获取本周账单
   */
  getStorageOrderList() {
    event.getStorage('order_week').then(res => {
      // 计算总订单数目
      let all_order_num = 0
      // 计算总订单金额
      let all_order_price = 0
      // 计算参与人数
      let all_order_people = 0
      // 格式化本周订单
      for (let i in res) {
        if (i !== 'exprie_at') {
          this.data.weekOrderList.push({
            day: i,
            member_price_list: res[i]
          })
          // this.data.dayList.push({
          //   value: i,
          //   name: '星期' + i
          // })
          res[i].forEach(item => {
            let find_flag = false
            this.data.day_number_order_list.forEach(array => {
              if (item.name === array.name) {
                // 添加数量
                if (item.noon_price !== '-') {
                  ++array.all_order_num
                    ++all_order_num
                  array.all_order_price += item.noon_price
                  all_order_price += item.noon_price
                }
                if (item.night_price !== '-') {
                  ++array.all_order_num
                    ++all_order_num
                  array.all_order_price += item.night_price
                  all_order_price += item.night_price
                }
                find_flag = true
              }
            })
            // 没有找到成员，添加
            if (!find_flag) {
              ++all_order_people
              item.all_order_num = 0
              item.all_order_price = 0
              if (item.noon_price !== '-') {
                ++item.all_order_num
                  ++all_order_num
                item.all_order_price += item.noon_price
                all_order_price += item.noon_price
              }
              if (item.night_price !== '-') {
                ++item.all_order_num
                  ++all_order_num
                item.all_order_price += item.night_price
                all_order_price += item.night_price
              }
              this.data.day_number_order_list.push({
                ...item
              })
            }
          })
        }
      }

      this.setData({
        weekOrderList: this.data.weekOrderList,
        week_order_detail: [{
          partake_number: all_order_people + '人', //参与人数
          total_order_number: all_order_num, //订单总数
          total_order_price: '￥' + all_order_price, //订单总金额
        }],
        day_number_order_list: this.data.day_number_order_list,
        // dayList: this.data.dayList
      })
    })
  },

  /**
   * 点击修改本周订单
   */
  showMask() {
    this.setData({
      showModifMask: true
    })
  },

  /**
   * 关闭遮罩
   */
  onClose() {
    this.setData({
      showModifMask: false
    })
  },

  /**
   * 选择了某天
   */
  selectDay(e) {
    // console.log('输出选择的内容==>', e)
    wx.navigateTo({
      url: '../today-bill/index?day=' + e.detail.value,
    })
  }
})