/* 下载文件需要配置小程序的download的合法域名，这是只是作为调试，不校验合法域名，手机体验需打开调试方能下载 */
module.exports = {
  /**
   * 点击操作
   * @param {
   *    file_path  保存的文件目录
   *    file   待下载保存的文件
   * }
   * @returns 
   */
  downLoad(file_path, file) {
    let that = this
    this.accessSync(file_path).then(function (err) {
      if (err) {
        return that.mkdirSync(file_path);
      }
    }).then(function (err) {
      if (!err) {
        that.downloadFile(file_path, file)
      }
    });
  },

  /**
   * 下载并保存文件
   * @param {
   *    file_path  保存的文件目录
   *    file    待下载保存的文件
   * }
   */
  downloadFile(file_path, file) {
    wx.downloadFile({
      url: file,
      success(res) {
        // 获取所下载的文件类型
        let file_type = res.header['Content-Type'].split('/')[1]

        // ios和安卓系统保存和打开文档有不同，根据不同系统做不同处理
        if (wx.getSystemInfoSync().platform === 'ios') {
          // ios系统没有提供文件搜索，所以直接打开文档分享（间接下载）
          wx.openDocument({
            filePath: res.tempFilePath,
            fileType: file_type,
            showMenu: true,
            success: function (res) {
              console.log('打开文档成功')
            }
          })
          return
        }

        wx.saveFile({
          tempFilePath: res.tempFilePath,
          filePath: file_path + `/${new Date().getTime()}.${file_type}`,
          success(res) {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'none'
            })

            // 打开pdf下载,可转发
            wx.openDocument({
              filePath: res.savedFilePath,
              fileType: file_type,
              showMenu: true,
              success: function (res) {
                console.log('打开文档成功')
              }
            })
          },
          fail(error) {
            console.log('保存失败', error)
            wx.hideLoading()
            wx.showToast({
              title: '保存失败',
              icon: 'none'
            })
          }
        })
      },
      fail(error) {
        console.log('下载失败', error)
        wx.hideLoading()
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })

      }
    })
  },

  /**
   * 判断当前的手机系统是否存在目录
   * @param {
   *    file_path  保存的文件目录
   * }
   */
  accessSync(file_path) {
    return new Promise((resolve, reject) => {
      let fm = wx.getFileSystemManager();
      try {
        fm.accessSync(file_path);
        resolve();
      } catch (err) {
        resolve(err);
      }
    });
  },

  /**
   * 当前系统不存在要保存的目录，创建
   * @param {
   *    file_path  保存的文件目录
   * }
   */
  mkdirSync(file_path) {
    return new Promise((resolve, reject) => {
      let fm = wx.getFileSystemManager();
      try {
        fm.mkdirSync(file_path, true);
        resolve();
      } catch (err) {
        resolve(err);
      }
    });
  },
};