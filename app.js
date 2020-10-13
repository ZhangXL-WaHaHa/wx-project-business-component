//app.js
App({
	onLaunch: function() {
		// 获取系统信息
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

	globalData: {
		systemInfo: null, //系统信息
	}
})
