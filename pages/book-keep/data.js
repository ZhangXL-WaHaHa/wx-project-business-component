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
	  
	  name: 13,  //用在弹出框显示
    },
    {
      price: 12,
	  name: 12
    },
    {
      price: 15,
	  name: 15
    }
  ],

  /* 一天的价格字段 */
  day: {
    noon: '',
    night: ''
  },

  /* 一周的点单的详情 */
  weekOrderList: null,
  
  /**
   * 一天的订单详情
   */
  dayOrderList: {
	  
  },

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