module.exports = {
	/**
	 * 将信息保存道本地
	 * @param {Object || String || Array} data 
	 * @param {String} key 
	 */
	setStorage(data, key) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        data: data,
        key: key,
        success: res => {
          console.log('信息保存成功==>', res)
          resolve()
        },
        fail: error => {
          console.log('信息保存失败==>', error)
          wx.showToast({
            title: '保存到本地失败',
            icon: 'none'
          })
          reject()
        }
      })
    })
	}
};
