// pages/components/calendar/index.js
import dateUtil from "dateUtil.js"
import holiday from "holiday.js"

const DAY_TYPE = ['last', 'cur', 'next'] //类型，分为上月，本月和下个月
const DATE_TYPE = ['between', 'select', 'unSelect']
let preHeight = 999  //记录上一次高度，实现过渡动画

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 日历类型
		// 默认是单选类型，提供选择范围和多选类型[range, multiple]
		calendarType: {
			type: String,
			value: 'single'
		},

		// 预先设置选中的日期
		selectDate: {
			type: String,
			value: ''
		},
		// 仅当日历类型为日期多选类型生效
		selectDateMultiple: {
			type: Array,
			value: []
		},
		// 仅当日历类型为选择日期范围类型生效
		selectDateRange: {
			type: Object,
			value: {
				begin: '',
				end: '',

				// 新增开始结束文案,文案提示形式暂定为显示正中间
				beginText: '开始',
				endText: '结束'
			}
		},
		// 仅当设置为选择日期范围类型生效,  设置范围天数  
		selectDateRangeSize: {
			type: Number,
			value: -1
		},
		// 仅当设置为选择日期范围类型生效， 起始和结束是否可以是同一天
		allowSameDate: {
			type: Boolean,
			value: false
		},

		// 是否显示日历标题
		showTitle: {
			type: Boolean,
			value: true
		},
		// 日历标题
		title: {
			type: String,
			value: '日历标题'
		},
		// 日历副标题
		showSubTitle: {
			type: Boolean,
			value: true
		},

		// 控制一开始显示的时间（数据格式：2020-09-28）
		beginTime: {
			type: String,
			value: ''
		},

		// 每月是否显示上下月的残余天数
		showRemnantDays: {
			type: Boolean,
			value: true
		},

		// 日历是否固定显示六行
		fixRow: {
			type: Boolean,
			value: false
		},

		//	日期是否显示相关的数据
		dateText: {
			type: Array,
			value: [{
				value: '2020-08-09',
				text: '售'
			}]
		},

		// 是否显示月份水印
		showMark: {
			type: Boolean,
			value: true
		},

		// 是否显示底部按钮
		showButton: {
			type: Boolean,
			value: false
		},
		// 底部按钮文案
		btnText: {
			type: String,
			value: '多选需要设置按钮文案'
		},

		// 是否显示高度过渡动画，仅在没有固定行数下生效
		animated: {
			type: Boolean,
			value: true
		},

		// 是否显示相关的节假日
		showHoliday: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		dayType: DAY_TYPE,
		weekList: ['日', '一', '二', '三', '四', '五', '六'], //一周

		// 每个日期添加颜色状态
		// 表示范围之间，选中，未选中, 已过期四种状态
		calendarInfo: {
			last: {
				year: -1,
				month: -1,
				list: [],
				swiperHeight: 999
			},
			cur: {
				year: -1,
				month: -1,
				day: -1,
				select: -1, //选中的时间,位置
				swiperHeight: 999, //滚动框的高度
			},
			next: {
				year: -1,
				month: -1,
				list: [],
				swiperHeight: 999
			}
		}, //日历信息
		subTitle: {
			year: '',
			month: ''
		}, //日历副标题

		showCalendarIndex: 1, //当前显示的日历信息
		calendarHeight: 999, //记录日历当前的高度
	},

	// 一开始加载时获取当前的时间
	attached() {
		this.data.calendarInfo.cur = {
			...dateUtil.formatNowDate(this.properties.beginTime),
			list: []
		}

		this.formatMonthData(this.data.calendarInfo.cur)
		// 计算上个月和下个月的数据
		this.getLastMonth()
		this.getNextMonth()

		// 计算完成
		this.setData({
			['calendarInfo.cur']: this.data.calendarInfo.cur,
		})
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 获取本月的天数和1号是星期几
		formatMonthData(date) {
			let value = dateUtil.getTotalDays(date)

			// 添加日期
			for (let i = 1; i <= value; i++) {
				date.list.push({
					value: i,
					type: 'cur',
					color: 'unSelect'
				})
			}
			// 根据不同的日历模式格式化日期数据
			// 需要判断是否有设置预选日期
			switch (this.properties.calendarType) {
				case 'multiple':
					this.formatMultipleDateColor(date)
					break;
				case 'range':
					this.formatRangeDateColor(date)
					break;
				default:
					this.formatDateColor(date)
			}

			// 获取当前月份1号星期几
			date.firstDayWeek = dateUtil.getFirstDayWeek(date)
			// 计算残余天数
			this.calculateResidualDays(date)
		},

		// 格式化多选日历类型选中日期
		formatMultipleDateColor(date) {
			// 判断当前是否有预选的日期
			if (this.properties.selectDateMultiple.length !== 0) {
				// 判断预选的日期是否与当前的日期一致
				this.properties.selectDateMultiple.forEach((item, index) => {
					date.list.forEach((arr, temp) => {
						if (item === date.year + '-' + date.month + '-' + arr.value) {
							arr.color = 'select'
						}
					})
				})
			}
		},
		// 格式化选择范围日期
		formatRangeDateColor(date) {
			// 格式化开始的日期和结束日期时间戳
			let beginTimeStamp = new Date(this.properties.selectDateRange.begin.replace(/-/g, '/')).getTime()
			let endTimeStamp = new Date(this.properties.selectDateRange.end.replace(/-/g, '/')).getTime()

			// 判断是否有选择日期
			if (this.properties.selectDateRange.begin === '' && this.properties.selectDateRange.end === '' || beginTimeStamp >
				endTimeStamp) {
				return;
			} else {
				// 判断日期是否在选择范围之内
				date.list.forEach((item, index) => {
					let timeStamp = new Date(date.year + '/' + date.month + '/' + item.value).getTime()
					if (timeStamp === beginTimeStamp) {
						item.color = 'select'
						item.rangTip = this.properties.selectDateRange.beginText
					} else if (timeStamp === endTimeStamp) {
						item.color = 'select'
						item.rangTip = this.properties.selectDateRange.endText
					} else if (timeStamp > beginTimeStamp && timeStamp < endTimeStamp) {
						item.color = 'between'
					}
				})
			}
		},
		// 格式化单选日期
		formatDateColor(date) {
			// 判断是否有预选的日期
			date.list.forEach((item, index) => {
				if ((date.year + '-' + date.month + '-' + item.value) === this.properties.selectDate) {
					item.color = 'select'
				}
			})
		},

		// 根据当前的天数，计算上月残余天数和下月残余天数
		calculateResidualDays(date) {
			// 计算上月残余天数,需要知道1号是星期几(个数)且上月最后一天是几号(起始数值)
			let last_value = dateUtil.getTotalDays({
				year: date.year,
				month: date.month - 1
			})
			for (let i = 0; i < date.firstDayWeek; i++) {
				date.list.unshift({
					value: this.properties.showRemnantDays ? last_value - i : '',
					type: 'last'
				})
			}

			// 计算下月残余天数,需要知道本月显示多少行
			let total = Math.floor(date.list.length / 7)
			if (date.list.length % 7 > 0) {
				++total
			}
			if (this.properties.fixRow) {
				// 设置了每月固定显示6行
				total = 6
			}
			let next_value = total * 7 - date.list.length

			// 设置滚动框的高度,设置变化的过渡动画
			date.swiperHeight = total * 107
			for (let i = 1; i <= next_value; i++) {
				date.list.push({
					value: this.properties.showRemnantDays ? i : '',
					type: 'next'
				})
			}

			//	格式化显示的提示信息
			this.formatShowTip(date)
		},

		// 获取上个月的日期数据
		getLastMonth() {
			let changeKey = DAY_TYPE[this.data.showCalendarIndex - 1 >= 0 ? this.data.showCalendarIndex - 1 : 2]
			let date = this.data.calendarInfo[DAY_TYPE[this.data.showCalendarIndex]]
			let changeDate = this.data.calendarInfo[changeKey]

			// 使用滑动切换,不能够使用last表示上个月，传递参数，要改变的日期信息
			if (date.month === 1) {
				changeDate = {
					year: date.year - 1,
					month: 12,
					list: []
				}
			} else {
				changeDate = {
					year: date.year,
					month: date.month - 1,
					list: []
				}
			}

			// 计算上个月的详细情况
			this.formatMonthData(changeDate)
			this.setData({
				subTitle: {
					year: date.year,
					month: date.month
				},
				[`calendarInfo.${changeKey}`]: changeDate
			})
		},

		// 计算下个月的日期数据
		getNextMonth() {
			let changeKey = DAY_TYPE[(this.data.showCalendarIndex + 1) % 3]
			let date = this.data.calendarInfo[DAY_TYPE[this.data.showCalendarIndex]]
			let changeDate = this.data.calendarInfo[changeKey]

			if (date.month === 12) {
				// 格式化下个月信息
				changeDate = {
					year: date.year + 1,
					month: 1,
					list: []
				}
			} else {
				changeDate = {
					year: date.year,
					month: date.month + 1,
					list: []
				}
			}

			// 计算下个月的详细情况
			this.formatMonthData(changeDate)
			this.setData({
				subTitle: {
					year: date.year,
					month: date.month
				},
				[`calendarInfo.${changeKey}`]: changeDate
			})
		},

		//	点击选中某个时间节点
		selectDate(e) {
			let key = e.currentTarget.dataset.key
			let index = e.currentTarget.dataset.index
			// 修改对应的月份
			let date = this.data.calendarInfo[key]

			if (e.currentTarget.dataset.type === 'last') {
				if (!this.properties.showRemnantDays) {
					return;
				}
				this.showLastMonth()
			} else if (e.currentTarget.dataset.type === 'next') {
				if (!this.properties.showRemnantDays) {
					return;
				}
				this.showNextMonth()
			} else {
				// 当前模式为选择日期范围
				if (this.properties.calendarType === 'range') {
					this.selectDateRange(key, index)
					return;
				}

				// 当前模式为多选
				if (this.properties.calendarType === 'multiple') {
					this.selectDateMultiple(key, index)
					return;
				}

				// 单一模式下选择时间节点
				this.properties.selectDate = date.year + '-' + date.month + '-' + date.list[index].value
				// 重置三个月之内选中节点
				Object.keys(this.data.calendarInfo).forEach(item => {
					this.data.calendarInfo[item].list.forEach((arr, len) => {
						if (arr.color === 'select') {
							this.setData({
								[`calendarInfo.${item}.list[${len}].color`]: 'unSelect'
							})
						}
					})
				})
				this.setData({
					[`calendarInfo.${key}.list[${index}].color`]: 'select',
				}, () => {
					// 结束
					if (!this.properties.showButton) {
						this.tapBtn()
					}
				})
			}
		},
		// 日期范围选择模式下选择日期
		selectDateRange(key, index) {
			// 设置要修改的月份
			let date = this.data.calendarInfo[key]

			// 判断当前是否有开始日期或者是结束日期
			if (this.properties.selectDateRange.begin === '') {
				// 没有预设日期，设置起始日期
				this.properties.selectDateRange.begin = date.year + '-' + date.month + '-' + date.list[index].value
				this.setData({
					[`calendarInfo.${key}.list[${index}].color`]: 'select',
					[`calendarInfo.${key}.list[${index}].rangTip`]: this.properties.selectDateRange.beginText,
				})
			} else if (this.properties.selectDateRange.begin !== '' && this.properties.selectDateRange.end !== '') {
				// 重置三个月内的所有选中日期
				Object.keys(this.data.calendarInfo).forEach(item => {
					this.data.calendarInfo[item].list.forEach((arr, len) => {
						if (arr.color !== 'unSelect') {
							arr.color = 'unSelect'
							delete arr.rangTip
						}
					})
				})
				// 有起始位置和结束位置，点击日期,重新设置起始位置
				this.properties.selectDateRange.begin = date.year + '-' + date.month + '-' + date.list[index].value
				this.properties.selectDateRange.end = ''
				this.data.calendarInfo[key].list[index].color = 'select'
				this.data.calendarInfo[key].list[index].rangTip = this.properties.selectDateRange.beginText
				this.setData({
					calendarInfo: this.data.calendarInfo

				})
			} else {
				// 判断结束位置是否是在起始位置的前面，若是，清空退出
				this.properties.selectDateRange.end = date.year + '-' + date.month + '-' + date.list[index].value
				let beginTimeStamp = new Date(this.properties.selectDateRange.begin.replace(/-/g, '/')).getTime()
				let endTimeStamp = new Date(this.properties.selectDateRange.end.replace(/-/g, '/')).getTime()

				if (beginTimeStamp > endTimeStamp) {
					this.properties.selectDateRange = {
						...this.properties.selectDateRange,
						begin: '',
						end: ''
					}
					Object.keys(this.data.calendarInfo).forEach((item) => {
						this.data.calendarInfo[item].list.forEach((arr, len) => {
							if (arr.color === 'select') {
								arr.color = 'unSelect'
								delete arr.rangTip
								this.setData({
									[`calendarInfo.${item}.list[${len}]`]: this.data.calendarInfo[item].list[len]
								})
							}
						})
					})
					return;
				}

				// 判断是否设置了起始位置和结束位置是否可以一致,没有，清空退出
				if (!this.properties.allowSameDate && beginTimeStamp === endTimeStamp) {
					// this.properties.selectDateRange = {
					// 	begin: '',
					// 	end: ''
					// }
					// this.setData({
					// 	[`calendarInfo.${key}.list[${index}].color`]: 'unSelect',
					// })
					// 不做任何处理
					this.properties.selectDateRange.end = ''
					return;
				}

				// 判断起始和结束的天数是否大于选择的范围
				let dayRange = this.properties.allowSameDate ? 1 : 2
				if (this.properties.selectDateRangeSize >= dayRange) {
					// 判断起始和结束相差的天数,要加上结束那一天
					let differDay = (endTimeStamp - beginTimeStamp) / (24 * 60 * 60 * 1000) + 1
					if (differDay > this.properties.selectDateRangeSize) {
						wx.showToast({
							title: '选择的天数不能超过' + this.properties.selectDateRangeSize + '天',
							icon: 'none'
						})
						// 计算结束的位置
						let differTimeStamp = (this.properties.selectDateRangeSize - 1) * 24 * 60 * 60 * 1000
						endTimeStamp = beginTimeStamp + differTimeStamp
						let endDate = new Date(endTimeStamp)
						this.properties.selectDateRange.end = endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
					}
				}

				// 设置相关的日期颜色范围,使用时间戳判断
				Object.keys(this.data.calendarInfo).forEach(item => {
					this.data.calendarInfo[item].list.forEach((arr, len) => {
						let timeStamp = new Date(this.data.calendarInfo[item].year + '/' + this.data.calendarInfo[item].month + '/' +
							arr.value).getTime()
						if (timeStamp > beginTimeStamp && timeStamp < endTimeStamp && arr.type === 'cur') {
							arr.color = 'between'
						} else if (timeStamp === endTimeStamp && arr.type === 'cur') {
							arr.color = 'select'
							console.log('经过这一步')
							arr.rangTip = this.properties.selectDateRange.endText
						}
					})
				})
				this.setData({
					calendarInfo: this.data.calendarInfo
				}, () => {
					if (!this.properties.showButton) {
						this.tapBtn()
					}
				})
			}
		},
		// 日期多选模式下选择日期
		selectDateMultiple(key, index) {
			// 设置要修改的月份
			let date = this.data.calendarInfo[key]

			// 修改select属性,添加和弹出新的日期
			if (date.list[index].color === 'select') {
				// 多选日期找到对应的数据，弹出
				this.properties.selectDateMultiple.forEach((item, temp) => {
					if (item === date.year + '-' + date.month + '-' + date.list[index].value) {
						this.properties.selectDateMultiple.splice(temp, 1)
					}
				})
				this.setData({
					[`calendarInfo.${key}.list[${index}].color`]: 'unSelect',
				})
			} else if (date.list[index].color === 'unSelect') {
				// 直接添加对应的数据
				this.properties.selectDateMultiple.push(date.year + '-' + date.month + '-' + date.list[index].value)
				this.setData({
					[`calendarInfo.${key}.list[${index}].color`]: 'select',
				})
			}
		},

		//	格式化显示的文字
		formatShowTip(date) {
			// 判断是否显示相关的节假日
			if (this.properties.showHoliday) {
				this.formatHolidayTip(date)
			}
			// 循环遍历找出对应的要显示的文字日期
			this.properties.dateText.forEach((item, index) => {
				date.list.forEach((arr, temp) => {
					let value = date.year + '-' + date.month + '-' + arr.value
					if (item.value === value && arr.type === 'cur') {
						arr.tip = item
					}
				})
			})
		},
		// 格式化节假日标签
		formatHolidayTip(date) {
			holiday.holidayList.forEach((item, index) => {
				date.list.forEach((arr, temp) => {
					// 判断月日是否一致   显示上下月残余的提示文案
					let value
					switch (arr.type) {
						case 'last':
							value = (date.month - 1 > 0 ? date.month - 1 : 12) + '-' + arr.value
							break;
						case 'cur':
							value = date.month + '-' + arr.value
							break;
						case 'next':
							value = (date.month + 1 > 12 ? 1 : date.month + 1) + '-' + arr.value
							break;
					}
					if (item.value === value) {
						arr.tip = {
							...item,
							color: arr.type === 'cur' ? 'red' : '',
							type: 'text'
						}
					}
				})
			})
		},

		// 点击显示下一月
		showNextMonth() {
			preHeight = this.data.calendarInfo[DAY_TYPE[this.data.showCalendarIndex]].swiperHeight
			// 显示下一个月的数据,需要改变的数据是下下个月
			this.setData({
				showCalendarIndex: (++this.data.showCalendarIndex) % 3,
			}, () => {
				this.calendarHeightTransition()
			})

			// 获取下一个月的数据，会改变下个月的数据
			this.getNextMonth()
		},

		// 点击显示上一月
		showLastMonth() {
			preHeight = this.data.calendarInfo[DAY_TYPE[this.data.showCalendarIndex]].swiperHeight
			// 切换上个月，需要改变的数据是上上个月
			this.setData({
				showCalendarIndex: (--this.data.showCalendarIndex) < 0 ? 2 : this.data.showCalendarIndex,
			}, () => {
				this.calendarHeightTransition()
			})

			// 获取上一个月的数据
			this.getLastMonth()
		},

		// 日历高度的过渡动画
		calendarHeightTransition() {
			if (!this.properties.animated && this.properties.fixRow) {
				return;
			}
			this.animate('#calendar', [{
					height: preHeight
				},
				{
					height: this.data.calendarInfo[DAY_TYPE[this.data.showCalendarIndex]].swiperHeight
				},
			], 100, function () {}.bind(this))
		},

		// 点击按钮，完成日期选择
		tapBtn() {
			// 判断当前的模式
			switch (this.properties.calendarType) {
				case 'multiple':
					this.triggerEvent('finishSelectDate', this.properties.selectDateMultiple)
					break;
				case 'range':
					this.triggerEvent('finishSelectDate', this.properties.selectDateRange)
					break;
				default:
					this.triggerEvent('finishSelectDate', this.properties.selectDate)
			}
		},

		// 手指滑动日历
		gestureSlide() {
			return false;
		}
	}
})