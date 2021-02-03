// pages/index/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

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
	
	// 跳转到小球掉落动画
	handleBallAnimation() {
		wx.navigateTo({
			url: '../ball-animation/index'
		})
	},
	
	// 跳转到透明渐变导航栏
	handleTransparentBar() {
		wx.navigateTo({
			url: '../transparent-bar/index'
		})
	},
	
	// 跳转到可滑动的日历
	handleSlideCalendar() {
		wx.navigateTo({
			url: '../slide-calendar/index'
		})
	},

	// 跳转到下载保存文件
	handleDownLoadFile() {
		wx.navigateTo({
			url: '../download-file/index',
		})
	},

	/**
	 * 使用一些自己不常使用的api
	 */
	handleApi() {
		wx.navigateTo({
			url: '../api-use/index',
		})
	}
})
