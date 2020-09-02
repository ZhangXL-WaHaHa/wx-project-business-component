//logs.js
const ballFallAnimation = require('../../utils/ballFallAnimation.js')

var app = getApp()
Page({
  data: {
    commodityList: [],
    ballAnimationArray: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //小球动画
    keyFrames: [], //动画帧
    bus_y: -20, //手指点击的位置
  },

  onLoad: function () {
    // 获取商品数组
    for (let i = 0; i < 20; i++) {
      this.data.commodityList.push({
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598635719606&di=d90965331efd5c6dc2645ecb5fbba324&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2905120353%2C3638949522%26fm%3D214%26gp%3D0.jpg',
        name: '这是商品',
        price: 99
      })
    }
    this.setData({
      commodityList: this.data.commodityList
    })

    // 设置购物车位置
    this.busPos = {};
    this.busPos['x'] = 45; //购物车的位置
    this.busPos['y'] = wx.getSystemInfoSync().windowHeight - 56;
  },

  onReady: function () {
    this.ballComponent = []
    // Do something when page ready.
    // 循环获取所有的小球节点
    for (let i = 0; i < this.data.ballAnimationArray.length; i++) {
      // 获取小球节点信息
      this.ballAnimation = this.selectComponent(`#ball-${i}`)
      // 将小球信息存储
      this.ballComponent.push(this.ballAnimation)
    }
  },

  tapAdd(e) {
    // 简单判断手指点击位置是否是上次点击的位置，若是，直接是用上一次计算的关键帧数组
    // console.log('输出当前点击为位置', this.data.bus_y, e.touches["0"].clientY)
    if (Math.abs(this.data.bus_y - e.touches["0"].clientY) > 20) {
      this.data.keyFrames = []
      this.data.bus_y = e.touches["0"].clientY
      let points = ballFallAnimation.touchOnGoods({
        x: e.touches["0"].clientX - 10,
        y: e.touches["0"].clientY - 50
      }, this.busPos, 80)
      var index = 0,
        bezier_points = points['bezier_points'];

      var len = bezier_points.length;
      index = len

      // 放入关键帧
      for (let i = index - 1; i > -1; i--) {
        this.data.keyFrames.push({
          left: bezier_points[i]['x'] + 'px',
          top: bezier_points[i]['y'] + 'px',
          opacity: i === 0 ? 0 : 1,
          offset: 0.4
        })
      }
    }
    this.startAnimation()
  },

  startAnimation: function () {
    // 数组循环，每次开启动画弹出一个数组里面，完成动画之后重新排队
    let id = this.data.ballAnimationArray.pop()

    this.ballComponent[id].startAnimation(this.data.keyFrames)

  },

  // 小球组件动画结束
  endAnimation(e) {
    this.data.ballAnimationArray.unshift(e.detail)

    // 开启购物车动画
    this.startShopCartAnimation()

    // 处理事件逻辑
    // Tip: 后续事件逻辑最好少使用setData,不然在低端机上表现起来会很不流畅
  },

  // 创建购物车动画
  startShopCartAnimation() {
    this.animate("#shopCart", [{
        scale: [0.8, 0.8]
      },
      {
        scale: [1.1, 1.1]
      },
      {
        scale: [0.9, 0.9]
      },
      {
        scale: [1, 1]
      }
    ], 400, function () {

    }.bind(this))
  },




  // 
  areAppMessage: function () {
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