//logs.js
const util = require('../../utils/util.js')
let aa = {
  "catList": [{
      "id": 49,
      "shopId": 1,
      "categoryName": "22",
      "createTime": 1509004117000,
      "goodsList": []
    },
    {
      "id": 48,
      "shopId": 1,
      "categoryName": "6666",
      "createTime": 1509004096000,
      "goodsList": []
    },
    {
      "id": 47,
      "shopId": 1,
      "categoryName": "牛肉",
      "createTime": 1509003890000,
      "goodsList": []
    },
    {
      "id": 46,
      "shopId": 1,
      "categoryName": "海鲜",
      "createTime": 1508403109000,
      "goodsList": []
    },
    {
      "id": 45,
      "shopId": 1,
      "categoryName": "GG",
      "createTime": 1508402074000,
      "goodsList": []
    },
    {
      "id": 44,
      "shopId": 1,
      "categoryName": "炸药",
      "createTime": 1508400823000,
      "goodsList": []
    },
    {
      "id": 41,
      "shopId": 1,
      "categoryName": "555555",
      "createTime": 1507626025000,
      "goodsList": []
    },
    {
      "id": 40,
      "shopId": 1,
      "categoryName": "96969",
      "createTime": 1507625996000,
      "goodsList": []
    },
    {
      "id": 39,
      "shopId": 1,
      "categoryName": "55",
      "createTime": 1507625974000,
      "goodsList": []
    },
    {
      "id": 36,
      "shopId": 1,
      "categoryName": "马肉",
      "createTime": 1505871886000,
      "goodsList": [{
        "id": 42,
        "shopId": 1,
        "catId": 36,
        "name": "213",
        "store": 34,
        "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
        "price": 23,
        "disabled": 0
      }]
    },
    {
      "id": 35,
      "shopId": 1,
      "categoryName": "猪头",
      "createTime": 1505871874000,
      "goodsList": [{
        "id": 47,
        "shopId": 1,
        "catId": 35,
        "name": "2",
        "store": 2,
        "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
        "price": 2,
        "disabled": 0
      }]
    },
    {
      "id": 34,
      "shopId": 1,
      "categoryName": "小笼包",
      "createTime": 1505871796000,
      "goodsList": [{
        "id": 44,
        "shopId": 1,
        "catId": 34,
        "name": "213",
        "store": 5,
        "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
        "price": 60,
        "disabled": 0
      }]
    },
    {
      "id": 33,
      "shopId": 1,
      "categoryName": "干果",
      "createTime": 1505871674000,
      "goodsList": []
    },
    {
      "id": 32,
      "shopId": 1,
      "categoryName": "板砖",
      "createTime": 1505799519000,
      "goodsList": []
    },
    {
      "id": 31,
      "shopId": 1,
      "categoryName": "炸药",
      "createTime": 1505799073000,
      "goodsList": []
    },
    {
      "id": 5,
      "shopId": 1,
      "categoryName": "肉",
      "createTime": 1505791642000,
      "goodsList": [{
          "id": 43,
          "shopId": 1,
          "catId": 5,
          "name": "狗腿腊肉",
          "store": 60,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 88,
          "disabled": 0
        },
        {
          "id": 52,
          "shopId": 1,
          "catId": 5,
          "name": "麻鸡",
          "store": 10,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 10,
          "disabled": 0
        }
      ]
    },
    {
      "id": 8,
      "shopId": 1,
      "categoryName": "王者农药皮肤",
      "createTime": 1501229094000,
      "goodsList": [{
          "id": 7,
          "shopId": 1,
          "catId": 8,
          "name": "拉不住的亚瑟",
          "store": 50,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 22.2,
          "disabled": 0
        },
        {
          "id": 8,
          "shopId": 1,
          "catId": 8,
          "name": "拉不住的德玛西亚",
          "store": 22,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 22,
          "disabled": 0
        }
      ]
    },
    {
      "id": 7,
      "shopId": 1,
      "categoryName": "lol皮肤",
      "createTime": 1501229086000,
      "goodsList": [{
        "id": 6,
        "shopId": 1,
        "catId": 7,
        "name": "德玛西亚",
        "store": 99,
        "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
        "price": 99,
        "disabled": 0
      }]
    },
    {
      "id": 6,
      "shopId": 1,
      "categoryName": "飞机大炮",
      "createTime": 1501229077000,
      "goodsList": [{
        "id": 5,
        "shopId": 1,
        "catId": 6,
        "name": "大刀",
        "store": 10,
        "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
        "price": 32.41,
        "disabled": 0
      }]
    },
    {
      "id": 4,
      "shopId": 1,
      "categoryName": "零食",
      "createTime": 1500971858000,
      "goodsList": [{
          "id": 2,
          "shopId": 1,
          "catId": 4,
          "name": "山泉水",
          "store": 100,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 0.01,
          "disabled": 0
        },
        {
          "id": 3,
          "shopId": 1,
          "catId": 4,
          "name": "中华",
          "store": 100,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 50,
          "disabled": 0
        },
        {
          "id": 4,
          "shopId": 1,
          "catId": 4,
          "name": "老婆饼",
          "store": 100,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 100,
          "disabled": 0
        }
      ]
    },
    {
      "id": 1,
      "shopId": 1,
      "categoryName": "酒水",
      "createTime": 1500971822000,
      "goodsList": [{
          "id": 1,
          "shopId": 1,
          "catId": 1,
          "name": "矿泉水",
          "store": 100,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 0.01,
          "disabled": 1
        },
        {
          "id": 48,
          "shopId": 1,
          "catId": 1,
          "name": "纯生",
          "store": 800,
          "image": "http://119.23.56.196:8888/prizeclawspc/resource/images/item/15096878908242 (2).png",
          "price": 6.5,
          "disabled": 0
        }
      ]
    }
  ],
  "shop": {
    "id": 1,
    "name": "起帆棋牌",
    "avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502800400869&di=a588089ff0d0072abafc3f2ec3c01806&imgtype=0&src=http%3A%2F%2Fp.zhuna.cn%2FHotel_Images%2F33479%2F283b40cb-30d5-403d-b583-d7ace1afd8a0.jpg",
    "timeStart": 1500543684000,
    "timeEnd": 1500565289000,
    "mobile": "13602427535",
    "status": 2,
    "areaId": 440100,
    "addr": "临江大道57号中和广场16A"
  },
  "hasFav": 0
};

var app = getApp()
Page({
  data: {
    goodList:[
      {

      }
    ],
    ballAnimationArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //小球动画
  },
  onReady: function () {
    this.ballComponent = []
    // Do something when page ready.
    // 循环获取所有的小球节点
    for(let i = 0; i < this.data.ballAnimationArray.length; i++) {
      // 获取小球节点信息
      this.ballAnimation = this.selectComponent(`#ball-${i}`)
      // 将小球信息存储
      this.ballComponent.push(this.ballAnimation)
    }
  },
  onLoad: function (options) {
    let systemInfo = wx.getStorageSync('systemInfo');
    let mechine = options; //wx.getStorageSync('mechine');
    let _that = this;

    this.busPos = {};
    this.busPos['x'] = 45; //购物车的位置
    this.busPos['y'] = wx.getSystemInfoSync().windowHeight - 56;

    this.setData({
      mechine: mechine,
      systemInfo: systemInfo,
      goodsH: systemInfo.windowHeight - 245 - 48
    });


    _that.setData({
      chessRoomDetail: aa //res.data.Object
    });

    let timeStart = util.getLocalTime(_that.data.chessRoomDetail.shop.timeStart)
    let timeEnd = util.getLocalTime(_that.data.chessRoomDetail.shop.timeEnd)

    //初始化右侧商品一开始滚动的位置
    _that.setData({
      toView: _that.GOODVIEWID + _that.data.chessRoomDetail.catList[0].id,
      timeStart: timeStart,
      timeEnd: timeEnd
    });

    //存下项目下的产品个数
    for (let i = 0; i < _that.data.chessRoomDetail.catList.length; i++) {
      _that.data.goodsNumArr.push(_that.data.chessRoomDetail.catList[i].goodsList.length);
      let goods = _that.data.chessRoomDetail.catList[i].goodsList;
      if (goods.length > 0) {
        for (let j = 0; j < goods.length; j++) {
          //console.log(goods[j].id)
          _that.data.goodMap[goods[j].id] = goods[j];
        }
      }

    }
    let HArr = [];
    for (let j = 0; j < _that.data.goodsNumArr.length; j++) {
      if (j == 0) {
        HArr.push(0);
      } else {
        HArr.push(_that.data.goodsNumArr[j] * 98 + HArr[j - 1]);
      }
    }

    _that.data.goodsNumArr = HArr;

  },
  onShareAppMessage: function () {
    let _that = this;
    return {
      title: _that.data.chessRoomDetail.shop.name,
      path: "/pages/orderdetail/orderdetail?shopId=" + _that.data.mechine.shopId + "&id=" + _that.data.mechine.id + "&address=" + _that.data.mechine.address
    }
  },
  //右侧列表滚动事件
  goodsViewScrollFn: function (e) {
    this.getIndexFromHArr(e.detail.scrollTop)
  },
  //传入滚动的值，去让右侧的类型也跟着变动
  getIndexFromHArr: function (value) {
    //找出滚动高度的区间，则找出展示中的商品是属于哪个类型
    for (var j = 0; j < this.data.goodsNumArr.length; j++) {
      if ((value >= this.data.goodsNumArr[j]) && (value < this.data.goodsNumArr[j + 1])) {
        //console.log(j+"bbb"+value + '####' + this.data.goodsNumArr[j])
        if (!this.data.fromClickScroll) {
          this.setData({
            catHighLightIndex: j
          });
        }
      }
    }
    this.setData({
      fromClickScroll: false
    });
  },


  //左侧列表点击事件
  catClickFn: function (e) {
    let that = this;
    let _index = e.target.id.split('_')[1];
    let goodListId = e.target.id.split('_')[2];

    // //左侧点击高亮
    this.setData({
      fromClickScroll: true
    });
    this.setData({
      catHighLightIndex: _index
    });
    //右侧滚动到相应的类型
    this.setData({
      toView: that.data.GOODVIEWID + goodListId
    });
  },
  //添加商品到购物车
  addGoodToCartFn: function (e) {
    let shoppingCart = JSON.parse(JSON.stringify(this.data.shoppingCart));
    let shoppingCartGoodsId = [];
    let _id = e.target.id.split('_')[1];
    let _index = -1;

    if (this.data.shoppingCartGoodsId.length > 0) {
      for (let i = 0; i < this.data.shoppingCartGoodsId.length; i++) {
        shoppingCartGoodsId.push(this.data.shoppingCartGoodsId[i])
        if (_id == this.data.shoppingCartGoodsId[i]) {
          _index = i;
        }
      }
    }

    if (_index > -1) { //已经存在购物车，只是数量变化
      shoppingCart[_id] = Number(shoppingCart[_id]) + 1;
    } else { //新增  
      shoppingCartGoodsId.push(_id);
      shoppingCart[_id] = 1;
    }

    //抛物线的动画
    //this.ballDrop(e);
    //this.touchOnGoods(e);

    this.setData({
      shoppingCart: shoppingCart,
      shoppingCartGoodsId: shoppingCartGoodsId
    });

    this._resetTotalNum();
  },
  touchOnGoods: function (e) {
    this.finger = {};
    var topPoint = {};
    this.finger['x'] = e.touches["0"].clientX - 10; //点击的位置，增加偏移位置改变小球出现的位置
    this.finger['y'] = e.touches["0"].clientY - 50;

    if (this.finger['y'] < this.busPos['y']) {
      topPoint['y'] = this.finger['y'] - 150;
    } else {
      topPoint['y'] = this.busPos['y'] - 150;
    }
    topPoint['x'] = Math.abs(this.finger['x'] - this.busPos['x']) / 2;

    if (this.finger['x'] > this.busPos['x']) {
      topPoint['x'] = (this.finger['x'] - this.busPos['x']) / 2 + this.busPos['x'];
    } else { //
      topPoint['x'] = (this.busPos['x'] - this.finger['x']) / 2 + this.finger['x'];
    }

    this.linePos = app.bezier([this.busPos, topPoint, this.finger], 80);
    this.startAnimation(e);
  },


  startAnimation: function (e) {
    let keyFrames = []

    var index = 0,
      that = this,
      bezier_points = that.linePos['bezier_points'];

    this.setData({
      hide_good_box: false,
      bus_x: that.finger['x'],
      bus_y: that.finger['y']
    })
    var len = bezier_points.length;
    index = len

    // 控制多个小球同时出现动画，需要判断上一个动画是否完成
    // 数组循环，每次开启动画弹出一个数组里面，完成动画之后重新排队
    // 多个动画同时出现,怎么控制是哪一个小球进行动画，小球动画完成之后，又怎么实现重新动画
    let id = this.data.ballAnimationArray.pop()
    // console.log('输出弹出的信息', id, this.data.ballAnimationArray)
    // 使用关键帧动画
    // 放入关键帧
    for (let i = index - 1; i > -1; i--) {
      keyFrames.push({
        opacity: i === 0 ? 0 : 1,
        left: bezier_points[i]['x'] + 'px',
        top: bezier_points[i]['y'] + 'px',
        offset: 0.4
      })
    }

    // 创建多个小球节点实现小球的动画
    // console.log('输出关键帧', keyFrames)

    // // 创建小球动画  
    // this.animate(`#ball-${id}`, keyFrames, 100, function () {
    //   this.addGoodToCartFn(e)

    //   // 每次完成动画清空之后放进去  基本可以实现连续小球动画，但是连续点击，小球动画会有明显的卡顿
    //   // 原因未明
    //   // 考虑使用小球动画组件  效果基本一致
    
    //   this.clearAnimation(`#ball-${id}`, () => {
    //     console.log('经过这一步')
    //     // 动画完成，将数据重新放入数组中
    //     this.data.ballAnimationArray.unshift(id)

    //     console.log('输出动画完成之后的数组', this.data.ballAnimationArray)
    //   })
    // }.bind(this))

    // 开启小球组件动画,连续点击效果也还是会卡顿
    this.ballComponent[id].startAnimation(keyFrames)

    // 使用小球

    // 
    // 创建时间间隔
    // setTimeout(() =>{
    //   // 创建第二个动画
    //   this.animate(`#ball-${2}`, keyFrames, 100, function() {
    //     this.addGoodToCartFn(e)

    //   }.bind(this))
    // }, 100)
    // this.timer = setInterval(function () {
    //   for(let i = index - 1; i > -1; i--) {
    //     console.log('输出数据', bezier_points[i]['x'])
    //     that.setData({
    //       bus_x: bezier_points[i]['x'],
    //       bus_y: bezier_points[i]['y']
    //     })

    //     if (i < 1) {
    //       clearInterval(that.timer);
    //       that.addGoodToCartFn(e);
    //       that.setData({
    //         hide_good_box: true
    //       })
    //     }
    //   }
    // }, 25);
  },

  // 小球组件动画结束
  endAnimation(e) {
    // 将该小球的id重新推进去
    this.data.ballAnimationArray.unshift(e.detail)

    // 数量改变
    // this.addGoodToCartFn()
  },

  //移除商品的事件
  decreaseGoodToCartFn: function (e) {
    console.log(e)
    let shoppingCart = JSON.parse(JSON.stringify(this.data.shoppingCart));
    let shoppingCartGoodsId = [];
    let _id = e.target.id.split('_')[1];
    let _index = -1;

    if (this.data.shoppingCartGoodsId.length > 0) {
      for (let i = 0; i < this.data.shoppingCartGoodsId.length; i++) {
        shoppingCartGoodsId.push(this.data.shoppingCartGoodsId[i]);
        if (_id == this.data.shoppingCartGoodsId[i]) {
          _index = i;
        }
      }
    }

    if (_index > -1) { //已经存在购物车，只是数量变化
      shoppingCart[_id] = Number(shoppingCart[_id]) - 1;
      if (shoppingCart[_id] <= 0) {
        shoppingCartGoodsId.splice(_index, 1);
      }
    }

    this.setData({
      shoppingCart: shoppingCart,
      shoppingCartGoodsId: shoppingCartGoodsId
    });

    this._resetTotalNum();
  },
  //重新计算选择的商品的总数和总价
  _resetTotalNum: function () {
    let shoppingCartGoodsId = this.data.shoppingCartGoodsId,
      totalNum = 0,
      totalPay = 0,
      chooseGoodArr = [];

    if (shoppingCartGoodsId) {
      for (let i = 0; i < shoppingCartGoodsId.length; i++) {
        let goodNum = Number(this.data.shoppingCart[shoppingCartGoodsId[i]]);
        totalNum += Number(goodNum);
        totalPay += Number(this.data.goodMap[shoppingCartGoodsId[i]].price) * goodNum;
        chooseGoodArr.push(this.data.goodMap[shoppingCartGoodsId[i]]);
      }
    }

    this.setData({
      totalNum: totalNum,
      totalPay: totalPay.toFixed(2),
      chooseGoodArr: chooseGoodArr
    });
  },
  //电器购物车，购物列表切换隐藏或者现实
  showShopCartFn: function (e) {
    if (this.data.totalPay > 0) {
      this.setData({
        showShopCart: !this.data.showShopCart
      });
    }
  },
  //清空购物车
  clearShopCartFn: function (e) {
    this.setData({
      shoppingCartGoodsId: [],
      totalNum: 0,
      totalPay: 0,
      chooseGoodArr: [],
      shoppingCart: {}
    });
  },
  //结算
  goPayFn: function (e) {
    let goodsIds = "",
      quantitys = "",
      _that = this;

    for (let i = 0; i < this.data.shoppingCartGoodsId.length; i++) {
      goodsIds += this.data.shoppingCartGoodsId[i] + ",";
      quantitys += this.data.shoppingCart[this.data.shoppingCartGoodsId[i]] + ","
    }

    goodsIds = goodsIds.substring(0, goodsIds.length - 1);
    quantitys = quantitys.substring(0, quantitys.length - 1);

    let param = {
      goodsIds: goodsIds,
      quantitys: quantitys,
      shopId: this.data.chessRoomDetail.shop.id,
      type: 0, //订单类型 0是商品 1是麻将机
      address: this.data.mechine.address
    };

    //TODO调用后台接口
    wx.request({
      url: _that.data.url + 'momolewx/wx/order/goods/submit.do',
      data: param,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
})