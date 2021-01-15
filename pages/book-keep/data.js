/* 
 * 这是完成记账的基本信息字段
 *  */
export default {
  /* 成员基本信息 */
  memberInfo: [
    {
      name: '张晓立',
    },
    {
      name: '测试'
    },
    {
      name: '测试2号'
    }
  ],

  /* 价格基本信息 */
  priceInfo: [
    {
      price: 13,
    },
    {
      price: 12
    },
    {
      price: 15
    }
  ],

  /* 一天的价格字段 */
  day: {
    noon: '',
    night: ''
  },

  /* 价格类型 */
  price: [12, 13, 15],

  /* 点单的详情 */
  orderList: [],

  /* 星期对应关系 */
  week: {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  }
}