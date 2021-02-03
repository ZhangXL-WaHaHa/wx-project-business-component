//app.js
import updateManger from "./utils/updateManger"
App({
	onLaunch: function (options) {
		// 获取系统信息
		this.getSystemInfo()

		// 检测小程序版本更新
		updateManger.autoUpdate()
	},

	/**
	 * 获取系统信息
	 */
	getSystemInfo() {
		wx.getSystemInfo({
			success: (res) => {
				console.log('获取系统信息', res)
				this.globalData.systemInfo = res
			},
			fail: error => {
				console.log('获取系统信息失败', error)
			}
		})
	},

	/**
	 * 全局变量
	 */
	globalData: {
		systemInfo: null, //系统信息
	}
})