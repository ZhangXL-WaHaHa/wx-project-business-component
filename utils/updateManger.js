module.exports = {
  /**
   * 检测小程序版本更新
   * 更新完重新启动相当于手动删除了小程序在重新打开，会清空本地缓存
   * 相关的文档说明（https://developers.weixin.qq.com/miniprogram/dev/api/base/update/wx.getUpdateManager.html）
   */
  autoUpdate: function () {
    // 获取小程序更新机制兼容
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      //1. 检查小程序是否有新版本发布
      updateManager.onCheckForUpdate(res => {
        if (res.hasUpdate) {
          //检测到新版本，需要更新，给出提示
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            success: temp => {
              if (temp.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                this.downLoadAndUpdate(updateManager)
              } else if (temp.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  showCancel: false, //隐藏取消按钮
                  confirmText: "确定更新", //只保留确定更新按钮
                  success: res => {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      this.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
      return
    }

    /**
     * 用户的微信版本过低，提示更新
     */
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  },

  /**
   * 下载小程序新版本并重启应用
   */
  downLoadAndUpdate: function (updateManager) {
    wx.showLoading({
      title: '正在更新版本'
    })

    //1. 新版本下载成功，重启小程序
    updateManager.onUpdateReady(function () {
      wx.hideLoading()
      // 重启
      updateManager.applyUpdate()
    })

    //2. 新版本下载提示，提示手动重启
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    })
  },
}