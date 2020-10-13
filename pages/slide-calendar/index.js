//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		
		show: false,  //是否显示日历弹出框
		showMultiple: false,
		showRange: false,
		
		showDataText: [
			{
				value: "2020-10-1",
				text: '国庆节',
				type: 'text',  //文本类型
				color: 'red',  //文本颜色
			},
			{
				value: '2020-10-8',
				text: '休',
				type: 'tag',  //标签类型
				color: 'lightblue',  //标签颜色
			},
			{
				value: '2020-10-9',
				text: '班',
				type: 'tag',  //标签类型
				color: 'green',  //标签颜色
			},
			{
				value: '2021-2-8',
				text: '余32',
				color: 'blue'
			}
		],  //日历上显示相关的提示
		
		selectDateMultiple: [
			'2020-12-10',
			'2020-10-15',
			'2020-10-18',
			'2020-11-7'
		],  //多选日期预设值
		selectDateRange: {
			begin: '',
			end: '',
			beginText: '',
			endText: ''
		},  //范围选择预设值
		selectDate: '2020-10-16',
	},
	//事件处理函数
	bindViewTap: function() {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function() {
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	getUserInfo: function(e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	},
	
	// 点击显示日历弹出框
	showCalendar() {
		this.setData({
			show: true
		})
	},
	showRangeCalendar() {
		this.setData({
			showRange: true
		})
	},
	showMultipleCalendar() {
		this.setData({
			showMultiple: true
		})
	},
	
	onClose() {
		this.setData({
			show: false,
			showRange: false,
			showMultiple: false
		})
	},
	
	// 完成选择
	finishSelectDate(e) {
		// 处理选择之后的逻辑
		// this.onClose()
		console.log('选择的日期 ==> ', e.detail)
	}
})
