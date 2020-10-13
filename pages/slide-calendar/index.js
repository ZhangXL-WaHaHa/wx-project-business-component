//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
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
				type: 'text',
				color: 'lightblue'
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
			beginText: '出发',
			endText: '离开'
		},  //范围选择预设值
		selectDate: '2020-10-16',
	},
	onLoad: function() {
		
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
