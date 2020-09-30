// pages/index/tourism-detail/index.js
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topImage: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1601294449848&di=def1c297c66d543f503cfa7c351a2bd5&imgtype=0&src=http%3A%2F%2Fimg.icom168.cn%2Fupload%2Fimages%2F7127%2F20200722%2F1595442176946.jpg', //顶部轮播图片

		changeOpacity: false, //改变透明度
		platform: app.globalData.systemInfo.platform, //手机系统
		statusBarHeight: app.globalData.systemInfo.statusBarHeight, //手机顶部状态栏的高度
		pageHeight: app.globalData.systemInfo.screenHeight, //整个页面的高度
		monitorLeaveLine: app.globalData.systemInfo.windowHeight + app.globalData.systemInfo.statusBarHeight + 45,
		scrollHeight: 0, //渐变导航栏显示的距离
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		// 计算导航栏完全显示需要滚动的距离   图片的高度-导航栏的高度(状态栏高度 + 标题栏高度)
		wx.createSelectorQuery().in(this).select('.top-image').boundingClientRect((temp) => {
			this.setData({
				scrollHeight: temp.height - this.data.statusBarHeight - 44,
			})
		}).exec()

		// 设置监听，解决安卓端scroll-view快速滑动的时候没有监听到滚动到顶部事件
		// ios端有回弹，所以监听得到滚动到顶部的事件
		if (this.data.platform === 'ios') {
			return;
		}
		this.createIntersectionObserver().relativeToViewport().observe('.scroll-monitor-line', res => {
			if (res.intersectionRatio > 0) {
				console.log('显示')
				this.setData({
					changeOpacity: true
				})
			}
		})
		this.createIntersectionObserver().relativeToViewport().observe('.scroll-monitor-line-leave', res => {
			if (res.intersectionRatio > 0) {
				console.log('离开')
				this.setData({
					changeOpacity: false
				})
			}
		})
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	
	// 点击返回
	goBack() {
		wx.navigateBack()
	}
})
