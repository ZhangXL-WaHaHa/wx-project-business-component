// pages/dynamic-table/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		// 标题栏部分
		tableHead: [{
				name: '姓名',
				prod: 'name',
				type: 'text', //设置整列的类型，暂时支持普通文本显示&&输入框类型&&按钮类型&&可操作文本显示&&标签类型
				// fixed: 'left', //设置固定列，目前暂支持设置left或者right两种值，设置其他值按照没有设置方法处理
				width: '150rpx', //宽度占比
				inputType: 'text', //指定输入框的类型，仅显示类型为input类型时有效
				textType: '',  //文本类型，暂支持Array(数组)&&String(字符串)， 默认字符串
			},
			{
				name: '电话',
				prod: 'phone',
				type: 'operationText',
				width: '200rpx', //宽度占比
				inputType: 'text', //指定输入框的类型，仅显示类型为input类型时有效
				textType: ''
			},
			{
				name: '身份证',
				prod: 'identify',
				type: 'input',
				width: '350rpx', //宽度占比
				inputType: 'number', //指定输入框的类型，仅显示类型为input类型时有效
				textType: ''
			},
			{
				name: '客户类型',
				prod: 'type',
				type: 'tag',
				width: '200rpx', //宽度占比
				inputType: 'text', //指定输入框的类型，仅显示类型为input类型时有效
				textType: 'Array'
			}
		],
		
		// 数据部分
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
	
	// 输入框回调事件
	input(e) {
		console.log('输入==>', e.detail)
	},
	focus(e) {
		console.log('聚焦==>', e.detail)
	},
	blur(e) {
		console.log('失焦==>', e.detail)
	},
	confirm(e) {
		console.log('确定==>', e.detail)
	},
	
	// 下载刷新回调
	pulling(e) {
		// console.log('被下拉==>', e)
	},
	refresh(e) {
		// console.log('被触发', e)
	},
	store(e) {
		// console.log('被复位==>', e)
	},
	abort(e) {
		// console.log('被中止==>', e)
	},
	
	// 上拉加载回调
	loadMore() {
		console.log('上拉加载')
	},
	
	// 点击可操作性文字回调
	tapOperationText(e) {
		console.log('点击了可操作性文字', e)
	},
	// 点击了按钮回调
	clickBtn(e) {
		console.log('点击了按钮==>', e)
	}
})
