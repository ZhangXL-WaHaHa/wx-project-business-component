import testData from './data'
import versionUtil from './versionUtil'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 列表数据
    // 滚动自动播放/停止视频
    screenHeight: wx.getSystemInfoSync().screenHeight,
    currentPlayingIndex: -1,
    currentPlayingId: '',
    scrollTop: 0, // 当前的滚动距离，android用到，用于在滑动的时候暂停视频的播放

    // 占位框的高度，防止闪屏
    placeholderBoxHeight: 0,

    // 话题自动滚动到某一个
    topicScroll: {
      parent_index: 0, // 第几个分组，由于遍历从0开始计数，所以这里也由0开始计数
      child_index: 0, // 第几个话题

      startPosition: '', // 手指开始点击的位置
      startTimeStamp: '', // 手指点击的时间，用于判断用户是快滑还是慢滑

      show_index: 0, // 当前页面显示的数据分组下标
      max_show_num: 3, // 每组的数据量
    },
    showPageBlock: false, // 设置顶部蒙层，阻止用户操作，目的是为了解决ios播放视频的瞬间用户操作屏幕出现的bug
    isIos: getApp().globalData.systemInfo.platform === 'ios', // 是否是ios系统，由于Android和ios表现有差异，故需要区分

    // 滚动框配置信息
    scrollBoxInfo: {
      canUseScrollBox: versionUtil.isVersionAvailable('2.14.4'), // 是否可以使用scroll-view最新特性
      scrollHeight: 999, // 滚动框的高度
      scrollView: null, // scroll-view组件实例
      refreshStatus: true, // 下拉刷新状态
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('微信对象==>', wx, this.__proto__.__proto__)
    this.getList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 获取scroll-box滚动实例
    wx.createSelectorQuery().select('#scrollView').node().exec(res => {
      if (!res[0]) {
        return
      }

      this.data.scrollBoxInfo.scrollView = res[0].node
      // 配置
      this.data.scrollBoxInfo.scrollView.fastDeceleration = true
      this.data.scrollBoxInfo.scrollView.showScrollbar = false
      this.data.scrollBoxInfo.scrollView.decelerationDisabled = false
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.list = []
    this.getList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getList()
  },

  /**
   * 页面滚动
   * @param e
   */
  onPageScroll(e) {
    // android页面滑动处理(非仿instagram版本)
    if (!this.data.isIos && !this.data.scrollBoxInfo.canUseScrollBox) {
      // 1. 处理当前页面正在播放的视频
      if (this.data.currentPlayingId && Math.abs(e.scrollTop - this.data.scrollTop) > 100) {
        this.selectComponent(this.data.currentPlayingId).pauseVideo()
        this.data.currentPlayingId = ''
      }

      // 2. 处理 Andorid 渲染的分组数据
      this._dealAndroidScroll(e)

      // 3. 处理视频自动播放
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.data.scrollTop = e.scrollTop // 记录下当前的滚动距离，滑动暂停视频播放的时候需要用到
        this.handleAutoPlay(e) // 视频自动播放
      }, 300)
    }

    // 处理ios滚动到顶部的情况
    if (this.data.isIos) {
      if (e.scrollTop < 1000 && this.data.topicScroll.parent_index !== 0) {
        this.data.topicScroll.parent_index = 0
        this.data.topicScroll.parent_index = 0
        this.data.topicScroll.child_index = 0

        this._dealListShow(0)
      }
    }
  },

  /**
   * 处理滚动，视频自动播放
   * @param e
   */
  handleAutoPlay(e) {},

  /**
   * 获取列表
   * @param {Boolean} dealList 是否处理列表
   */
  getList(dealList = true) {
    // 生成数据
    const imageList = testData.imageList
    const list = []
    for (let i = 0; i < 15; i++) {
      const index = Math.floor(Math.random() * imageList.length)
      list.push({
        item: {
          src: imageList[index],
          height: Math.floor(Math.random() * 100 + 300)
        }
      })
    }

    this._performanceOptimizingDealList(list, dealList)

    this.setData({
      'scrollBoxInfo.refreshStatus': false
    })
    wx.stopPullDownRefresh()
    wx.hideLoading()
  },

  // ***************  长列表渲染优化  ***************
  // ****  1. 将数据分解成二维数组，减少setData的数据量（由于每个帖子必有视频或图片，即占用空间大，将每次获取到的数据分为3组，一组最多5个)  ****
  // ****  2. 监听滚动到的item，每次页面显示最多5组（即最多25条数据）,减少渲染的dom  ****
  /**
   * 处理获取到的列表数据，提高性能
   * @param {Object} list 列表数据
   * @param {Boolean} dealList 是否处理数据，提前加载数据不需要处理
   */
  _performanceOptimizingDealList(list, dealList = true) {
    // 1. 设置参数
    // if (list.length) {
    //     this.data.query.max_id = list[list.length - 1].item.id

    //     if (this.data.query.is_nearest === 1) {
    //         this.setData({
    //             'query.page': ++this.data.query.page
    //         })
    //     }
    // }

    // 2. 赋值数据
    const index = this.data.list.length // 需要设置的index
    let new_list = []
    for (; list.length !== 0;) {
      new_list = list.splice(this.data.topicScroll.max_show_num)
      this.data.list.push({
        data: list,
        show: false
      })
      list = new_list
    }

    // 3. setData新的数据, 第一次渲染整个list，后续加载的新数据，只渲染那某个index下面的数据
    let render_data = {}
    if (!index) {
      render_data = {
        list: this.data.list,
      }
    } else {
      for (let i = index; i <= index + 20; i++) {
        if (this.data.list[i] && this.data.list[i].data) {
          render_data[`list[${i}].data`] = this.data.list[i].data
          render_data[`list[${i}].show`] = false
        }
      }
    }

    // 4. 处理需要渲染的数据
    if (dealList && this.data.topicScroll.parent_index >= (index - 1)) {
      this._dealListShow(index, render_data) // 重新处理需要渲染的数据
      return
    }
    this.setData(render_data)
  },

  /**
   * 处理分组数据显示(每次只渲染5组，即最多25条数据)
   * @param {Number} middleIndex // 处于中间分组所在的下标位置
   * @param {Object} render_data 需要setData的数据
   */
  _dealListShow(middleIndex, render_data = {}) {
    // 1. 判断可以渲染的数据
    let can_render = {}
    this.data.list.forEach((item, index) => {
      if (item.show && Math.abs(index - middleIndex) > 2) {
        item.show = false
        can_render[`list[${index}].show`] = false // 记录下
      }

      if (!item.show && Math.abs(index - middleIndex) <= 2) {
        item.show = true
        can_render[`list[${index}].show`] = true // 记录下
      }
    })

    // 2. 重新计算占位框的高度,第一次获取数据不需要计算
    const height = middleIndex > 2 ? this._calculatePlaceholderBoxHeight(middleIndex) : 0 // 重新计算占位框的高度

    // 3. 赋值
    this.setData({
      ...render_data,
      ...can_render,
      placeholderBoxHeight: height
    }, () => {
      // 第一组数据没有高度，证明是第一次加载，播放第一个视频
      // !this.data.list[0].height && this.selectComponent('#feed-' + this.data.list[0].data[0].item.id) && this.selectComponent('#feed-' + this.data.list[0].data[0].item.id).playVideo()

      this._getGroupListHeight() // 获取新的分组的高度

      if (this.data.isIos || this.data.scrollBoxInfo.canUseScrollBox) {
        !this.data.list[middleIndex + 3] && this.getList(false) // 提前加载新的数据
      }
    })
  },

  /**
   * 获取 有渲染，但是高度还没获取到的分组 的高度
   */
  _getGroupListHeight() {
    this.data.list.forEach((item, index) => {
      if (item.show && !item.height) {
        const id = '#feed-parent-' + index
        let query = wx.createSelectorQuery()

        query.select(id).boundingClientRect(rect => {
          this.data.list[index].height = rect.height + 5 // 5是指列表每一个item的margin-bottom距离
        }).exec();

        this.getTopicHeight(item.data, index) // 获取列表中每个话题的高度，用于计算滑动时要滚动的距离
      }
    })
  },

  /**
   * 计算占位框的高度
   * @param {Number} index // 当前显示栏,需要显示前两栏
   * @returns {Number} 高度
   */
  _calculatePlaceholderBoxHeight(middleIndex) {
    if (middleIndex - 2 <= 0) {
      this.data.placeholderBoxHeight = 0
      return 0
    }

    const index = middleIndex - 2
    this.data.placeholderBoxHeight = 0 // 重置当前的高度
    for (let i = 0; i < index; i++) {
      this.data.placeholderBoxHeight += (this.data.list[i].height || 0)
    }
    return this.data.placeholderBoxHeight
  },

  /**
   * 获取每个话题的高度，需要计算话题滚动的高度
   * @param {Array} topic_list // 话题列表
   * @param {Number} parent_index // 话题列表所在的分组下标
   */
  getTopicHeight(topic_list, parent_index) {
    topic_list.forEach((item, index) => {
      if (!item.real_height) {
        const id = '#feed-item-' + parent_index + '-' + index
        let query = wx.createSelectorQuery()

        query.select(id).boundingClientRect(rect => {
          item.real_height = rect.height + 5 // 5是指列表每一个item的margin-bottom距离
        }).exec();
      }
    })
  },

  // ***************  首页仿instagram效果相关代码  ***************
  // ******* 由于android的惯性滚动问题，暂时无法完美实现交互效果 *******
  /**
   * 监听手指点击操作
   * @param e
   */
  touchStart(e) {
    this.data.topicScroll.startTimeStamp = new Date().getTime() // 记录下当前手指点击事件
    this.data.topicScroll.startPosition = e.changedTouches[0].clientY // 记录下手指开始点击的位置
  },

  /**
   * 手指离开屏幕（ios版本）
   * @param e
   */
  iosTouchEnd(e) {
    const diffTime = new Date().getTime() - this.data.topicScroll.startTimeStamp // 手指离开的时候的时间戳
    const clientY = e.changedTouches[0].clientY // 手指离开屏幕的位置
    const diffY = Math.abs(clientY - this.data.topicScroll.startPosition) // 手指滑动的距离
    const direction = this.data.topicScroll.startPosition - clientY > 0 // 手指滑动的方向，true为向上滑，false为向下滑
    const scrollInfo = this.data.topicScroll

    // 要停止播放的视频
    const pausePlayId = '#feed-' + this.data.list[scrollInfo.parent_index].data[scrollInfo.child_index].item.id

    // 1. 第一个节点手指向下滑动 && 最后一个节点手指向上滑动 不做操作
    if (!scrollInfo.parent_index && !scrollInfo.child_index && !direction) {
      return
    } // 第一个节点向下滑动不做操作
    if (scrollInfo.parent_index === (this.data.list.length - 1) && scrollInfo.child_index === (this.data.list[scrollInfo.parent_index].data.length - 1) && direction) {
      return
    } // 最后一个节点向上滑动不做操作


    // 2. 根据滑动的方向，判断需要滚动到哪个节点下
    const can_move = (diffTime < 100 && diffY > 50) || (diffTime >= 100 && diffY > 80) // 是否可以滑动，手势滑动判断依据
    if (can_move) {
      if (direction) {
        if (scrollInfo.child_index === this.data.topicScroll.max_show_num - 1) {
          ++scrollInfo.parent_index
          scrollInfo.child_index = 0
        } else {
          ++scrollInfo.child_index
        }
      } else {
        if (scrollInfo.child_index === 0) {
          --scrollInfo.parent_index
          scrollInfo.child_index = this.data.topicScroll.max_show_num - 1
        } else {
          --scrollInfo.child_index
        }
      }
    }

    // 3. 处理滚动
    this._dealIosScroll(can_move ? pausePlayId : '', can_move)
  },

  /**
   * 处理ios页面滚动操作
   * @param {String} pausePlayId 要停止的视频id
   * @param {Boolean} canMove 是否可以滑动
   */
  _dealIosScroll(pausePlayId = '', canMove) {
    // 判断当前的手机系统是否是ios，如果不是ios，即为android的scroll-view版本
    if (!this.data.isIos) {
      this._dealScrollViewScroll(pausePlayId, canMove)
      return
    }

    const scrollInfo = this.data.topicScroll
    // 1. 计算页面应该滚动的高度
    let scrollTop = 0
    this.data.list.forEach((item, itemIndex) => {
      item.data.forEach((child, childIndex) => {
        if (itemIndex > scrollInfo.parent_index || (itemIndex === scrollInfo.parent_index && childIndex >= scrollInfo.child_index)) {
          return
        }
        scrollTop += child.real_height
      })
    })
    // 2. 页面滚动
    wx.pageScrollTo({
      scrollTop,
      duration: 150,
      success: () => {
        // if (this.videoTimer) {
        //     clearTimeout(this.videoTimer)
        // }
        // this.videoTimer = setTimeout(() => {
        //     const element = this.selectComponent('#feed-' + this.data.list[scrollInfo.parent_index].data[scrollInfo.child_index].item.id)

        //     if (element) {
        //         element && canMove && element.playVideo() // 播放当前视频
        //     }
        // }, 500)
      },
      complete: () => {
        // this.selectComponent(pausePlayId) && this.selectComponent(pausePlayId).pauseVideo()
        if (scrollInfo.child_index === this.data.topicScroll.max_show_num - 1 || scrollInfo.child_index === 0) {
          this._dealListShow(scrollInfo.parent_index) // 显示分组发生变化，重置需要渲染的分组
        }
      }
    })
  },

  /**
   * Android 监听滚动，动态设置分组
   * @param {Object} e
   */
  _dealAndroidScroll(e) {
    let max_height = 0 // 最大高度

    for (let i = 0; i <= this.data.topicScroll.show_index; i++) {
      max_height += this.data.list[i].height
    }
    let min_height = max_height - this.data.list[this.data.topicScroll.show_index].height // 最小高度

    // 超过，+1
    if (e.scrollTop > max_height && this.data.topicScroll.show_index < this.data.list.length - 1) {
      ++this.data.topicScroll.show_index
      this._dealListShow(this.data.topicScroll.show_index)
    }

    // 小于，-1
    if (e.scrollTop < min_height) {
      --this.data.topicScroll.show_index
      this._dealListShow(this.data.topicScroll.show_index)
    }
  },



  // *******  scroll-view版本，只能兼容版本库在 2.14.4 及其以上，不兼容的版本使用平滑滚动  *******
  /**
   * 处理android部分机型兼容scroll-view最新特性的版本，实现instagram交互模式
   * 处理方案与ios版本类型，只是将ios的页面滚动到指定位置改为scroll-view滚动到指定位置
   * @param {String} pausePlayId 要停止的视频id
   * @param {Boolean} canMove 是否可以滑动
   */
  _dealScrollViewScroll(pausePlayId = '', canMove) {
    const scrollInfo = this.data.topicScroll
    // 1. 计算页面应该滚动的高度
    let scrollTop = 0
    this.data.list.forEach((item, itemIndex) => {
      item.data.forEach((child, childIndex) => {
        if (itemIndex > scrollInfo.parent_index || (itemIndex === scrollInfo.parent_index && childIndex >= scrollInfo.child_index)) {
          return
        }
        scrollTop += (child.real_height || 0)
      })
    })

    this.data.scrollBoxInfo.scrollView.scrollTo({
      top: scrollTop,
      velocity: .1,
      duration: 200
    })

    // 因为scroll-view滚动无回调事件，这里就设置一定延时
    setTimeout(() => {
      // 3. 处理暂停视频播放，重新渲染分组 && 自动播放视频等操作
      // this.selectComponent(pausePlayId) && this.selectComponent(pausePlayId).pauseVideo()

      if (scrollInfo.child_index === this.data.topicScroll.max_show_num || scrollInfo.child_index === 0) {
        this._dealListShow(scrollInfo.parent_index) // 显示分组发生变化，重置需要渲染的分组
      }

      this.data.topicScroll.can_change_tab = true // 解锁切换tab

      // if (this.videoTimer) {
      //   clearTimeout(this.videoTimer)
      // }
      // this.videoTimer = setTimeout(() => {
      //   const element = this.selectComponent('#feed-' + this.data.list[scrollInfo.parent_index].data[scrollInfo.child_index].item.id)

      //   if (element && canMove) {
      //     element.playVideo() // 播放当前视频
      //   }
      // }, 500)
    }, 200)
  },

  /**
   * scroll-view组件触发下拉刷新
   * @param {Object} e
   */
  scrollViewRefresh(e) {
    wx.showLoading({
      title: '加载中'
    })

    // 重置数据
    // this.data.query.max_id = 0
    // this.data.query.page = 1
    this.data.list = []
    this.getList()
  },

  /**
   * 滚动到顶部
   * @param {Object} e 滚动信息
   */
  scrollToUpper(e) {
    // if (this.data.topicScroll.parent_index !== 0) {
    //     this.data.topicScroll.parent_index = 0
    //     this.data.topicScroll.parent_index = 0
    //     this.data.topicScroll.child_index = 0

    //     this._dealListShow(0)
    // }
  },

  /**
   * 滚动到底部操作
   * @param {Object} e 滚动信息
   */
  scrollToLower(e) {
    if (this.data.list.length && this.data.list.length > 1) {
      this.getList()
    }
  }
})