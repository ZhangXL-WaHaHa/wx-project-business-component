// pages/dynamic-table/components/table/index.js
import dataUtil from "../table/dataUtil"

Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		// 头部
		// 需要字段：是否是固定列，宽度占比，数值显示的类型，固定的位置
		tableHead: {
			type: Array,
			value: []
		},

		// table数据
		// 数据字段包含：数值，数据类型
		tableList: {
			type: Array,
			value: [{
				name: '哈哈哈',
				phone: '32323213131',
				identify: '110101198303079398',
				type: '成人',
			}, {
				name: '第二人',
				phone: '4234832',
				identify: '110101198303079398',
				type: '成人',
			}, {
				name: '第三人',
				phone: '23143453',
				identify: '110101198303079398',
				type: '小童不占床',
			}, {
				name: '哈哈哈',
				phone: '32323213131',
				identify: '110101198303079398',
				type: '成人',
			}, {
				name: '陈翔',
				phone: '24876372',
				identify: '110101198303079398',
				type: '成人',
			}, {
				name: '炸鸡腿',
				phone: '42422121',
				identify: '110101198303079398',
				type: '中童不占床',
			}, {
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			}, {
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			},{
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			},{
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			},{
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			},{
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			},{
				name: '蘑菇',
				phone: '323719287389',
				identify: '110101198303079398',
				type: '成人',
			},]
		},

		// 序号相关参数设定
		sort: {
			type: Object,
			value: {
				name: '序号', //排序名称
				show: false, //是否显示
				fixed: 'left', //设置固定的位置，默认不固定
			}
		},

		// 是否按比例适配标题头部 设置了固定标题失效
		proportionalFit: {
			type: Boolean,
			value: true
		},

		// 是否显示边框（并不是指没有边框，只是没有左右边框）
		border: {
			type: Boolean,
			value: true
		},

		// 下拉是否显示加载状态  仅当设置表格高度生效
		showRefreshStatus: {
			type: Boolean,
			value: false
		},
		
		// 设置表格的高度
		tableHeight: {
			type: String,
			value: '1000rpx'
		},
	},

	observers: {
		'tableHead, tableList': function(value, valueList) {
			// 处理标题栏各部分的宽度 
			// 几种情况：1.输入比例；2.直接输入数值；3.均有部分没有输入长度的情况
			let totalWidth = 0
			value.forEach(item => {
				// 判断当前的宽度纯数字类型还是字符串类型
				if (dataUtil.isNumber(item.width)) {
					// 数字类型，按比例增加长度
					totalWidth += item.width
				} else {
					// 其他类型  不做处理
					item.realWidth = item.width
				}
			})
			if (totalWidth !== 0) {
				// 计算每个item所占的宽度值
				value.forEach(item => {
					// 设置每个item的宽度  所占的比例是否是NAN，表示存在部分输入固定的数值\
					let width = isNaN(item.width / totalWidth) ? item.width : (item.width / totalWidth)
					item.realWidth = width * 100 + '%'
				})
			}
			value.forEach(item => {
				// 设置默认权重为1
				item.weight = 1
				// 存在固定位置，对固定位置进行调整,增加权重比，再用sort函数排序
				if (item.fixed === 'left') {
					item.weight = 0
				} else if (item.fixed === 'right') {
					item.weight = 2
				}
			})
			// 重新排列整个标题栏部分
			value.sort((a, b) => a['weight'] >= b['weight'] ? 1 : -1)
			
			console.log('输出格式化之后的数值==>', value)
			this.setData({
				tableTitle: value
			})
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		tableTitle: [], //表格标题部分

		hasFixed: false, //是否存在固定列
		showLeftShadow: false, //是否显示左边阴影
		showRightShadow: false, //是否显示右边阴影
		listenScroll: true,  //是否监听滚动
	},

	ready() {
		// 渲染完毕，设置监听器，解决多次监听滚动到最左或者最右事件
		this.createIntersectionObserver().relativeToViewport().observe('.monitorLeftLine', res => {
			if (res.intersectionRatio > 0) {
				// console.log('滚动到左边')
				this.data.listenScroll = false
				// 设置显示
				this.setData({
					showLeftShadow: true,
					showRightShadow: false
				})
			}
		})
		this.createIntersectionObserver().relativeToViewport().observe('.monitorRightLine', res => {
			if (res.intersectionRatio > 0) {
				// console.log('滚动到右边')
				this.data.listenScroll = false
				this.setData({
					showLeftShadow: false,
					showRightShadow: true
				})
			}
		})
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 监听滚动框滚动，设置显示阴影部分
		// 滚动到左边之后还会触发滚动事件，需要限制
		titleScroll() {
			if(!this.data.listenScroll) {
				this.data.listenScroll = true
				return ;
			}
			if (!this.data.showRightShadow || !this.data.showLeftShadow) {
				this.setData({
					showRightShadow: true,
					showLeftShadow: true
				})
			}
		},
		
		// 回调事件：上拉加载
		loadMoreData(e) {
			this.triggerEvent('loadMore', e)
		},
		
		// 回调输入框事件: 键盘输入&&键盘聚焦&&键盘失焦&&点击完成
		input(e) {
			this.triggerEvent('input', {
				index: e.currentTarget.dataset.index,
				...e.detail
			})
		},
		focus(e) {
			this.triggerEvent('focus', {
				index: e.currentTarget.dataset.index,
				...e.detail
			})
		},
		blur(e) {
			this.triggerEvent('blur', {
				index: e.currentTarget.dataset.index,
				...e.detail
			})
		},
		confirm(e) {
			this.triggerEvent('confirm', {
				index: e.currentTarget.dataset.index,
				...e.detail
			})
		},
		
		// 下拉刷新回调事件:下拉&&触发&&复位&中止
		pulling(e) {
			this.triggerEvent("pulling", e)
		},
		refresh(e) {
			this.triggerEvent('refresh', e)
		},
		store(e) {
			this.triggerEvent('store', e)
		},
		abort(e) {
			this.triggerEvent('abort', e)
		},
		
		// 点击了文字
		tapOperationText(e) {
			this.triggerEvent('tapOperationText', e.currentTarget.dataset.index)
		},
		
		// 点击了按钮
		clickBtn(e) {
			this.triggerEvent('clickBtn', {
				index: e.currentTarget.dataset.index,
				zIndex: e.currentTarget.dataset.zindex
			})
		}
	}
})
