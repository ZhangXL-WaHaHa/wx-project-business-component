/**
 * title: 微信小程序连接蓝牙并接受设备传输的数据
 * tip: 连接的蓝牙类型为BR/EDR，目前能够做到的操作是监听已经获取已经连接到的蓝牙广播数据段
 * tip: api并没有写完，只是摸索到一半的时候发现小程序对这种蓝牙类型的操作性不大，连接的意义并不是很大，更多的蓝牙操作参考低功耗蓝牙
 * @author WAA
 */
module.exports = {
  // 一些接口需要配置参数，可自行配置
  // 配置文档参考(https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth/wx.stopBluetoothDevicesDiscovery.html)
  configuration: {
    startBluetoothDevicesDiscovery: {}
  },

  /**
   * 判断当前的系统是否是ios系统，解决ios初始化蓝牙模块时需要指定mode
   * @returns {Boolean}
   */
  isIOS: function() {
    // 1. 同步方式获取系统信息
    try {
      const res = wx.getSystemInfoSync()
      return res.platform === 'ios'
    } catch(e) {
      return false
    }
  },

  /**
   * 初始化蓝牙模块
   * tip: ios上开启主机/从机模式下需要调用一次。指定对应的mode
   * @param {string} mode 模式
   */
  initBluetooth: function(mode = 'central') {
    wx.openBluetoothAdapter({
      mode,
      success: res => {
        console.log(res)
        this.watchBluetoothDeviceFound() // 监听寻找到设备事件
        this.searchBluetoothDevice() // 初始化成功，开始搜索设备
      },
      fail: error => {
        console.log(error)
        if (error.errCode === 10001) {
          wx.showToast({
            title: '蓝牙未开启或当前设备不支持蓝牙',
            icon: "none"
          })
          this.watchBluetoothStatus() // 开启监听蓝牙适配器状态变化
        }
      }
    })
  },

  /**
   * 监听蓝牙设备器状态变化
   */
  watchBluetoothStatus: function() {
    wx.onBluetoothAdapterStateChange(res => {
      console.log('adapterState changed, now is', res)
      // 监听到蓝牙适配器开启，开始搜索并连接蓝牙
      if (res.available) {
        this.watchBluetoothDeviceFound() // 监听寻找到设备事件
        this.searchBluetoothDevice()
      }
    })
  },

  /**
   * 搜索附近的蓝牙外围设备
   * tip: 消耗系统资源，搜索到并连接到蓝牙之后应立即停止搜索
   */
  searchBluetoothDevice: function() {
    wx.showLoading({
      title: '正在查找设备中',
      mask: true
    })
    wx.startBluetoothDevicesDiscovery({
      ...this.configuration.startBluetoothDevicesDiscovery,
      success: res => {
        console.log('搜索成功==>', res)
      },
      fail: error => {
        console.log('搜索失败==>', error)
        wx.hideLoading()
        if (error.errCode === 10001) {
          wx.showToast({
            title: '蓝牙未开启或当前设备不支持蓝牙',
            icon: "none"
          })
        }
        this.stopSearchBluetoothDevice() // 关闭查找
      }
    })
  },

  /**
   * 关闭搜索附近的蓝牙外围设备
   */
  stopSearchBluetoothDevice() {
    wx.stopBluetoothDevicesDiscovery({
      success: res => {
        console.log(res)
      },
      fail: error => {
        console.log('关闭失败')
      }
    })
  },

  /**
   * 监听寻找到外围设备
   */
  watchBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound(res => {
      wx.hideLoading()
      const devices = res.devices;
      console.log('寻找到的设备==>', devices)
      // console.log('new device list has founded')
      // console.dir(devices)
      // console.log(this.ab2hex(devices[0].advertisData))
    })
    
  },

  /**
   * 将ArrayBuffer转16进度字符串
   */
  ab2hex(buffer) {
    var hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function(bit) {
        return ('00' + bit.toString(16)).slice(-2)
      }
    )
    return hexArr.join('');
  },

  /**
   * 根据 uuid 获取处于已连接状态的设备。
   */
  connectBluetoothDevice() {

  }
}
