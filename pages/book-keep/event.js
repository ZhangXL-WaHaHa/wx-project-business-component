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
          wx.showToast({
            title: '保存到本地失败',
            icon: 'none'
          })
          reject()
        }
      })
    })
  },
  
  /**
	 * 从缓存中获取数据
	 * @param {String} key 
	 */
	getStorage(key) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: key,
        success: res => {
          console.log('获取缓存中的数据成功==>', res)
          resolve(res.data)
        },
        fail: error => {
          console.log('获取缓存数据失败==>', error)
          reject(error)
        }
      })
    })
	}
};
