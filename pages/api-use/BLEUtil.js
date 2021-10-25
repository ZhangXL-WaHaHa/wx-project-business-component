/**
 * title: 微信小程序连接蓝牙并接受设备传输的数据
 * tip: 连接的蓝牙类型为低功耗蓝牙(LE),能进行的操作比较全面，相较于经典蓝牙来讲
 * @author WAA
 */
module.exports = {
  // 一些接口需要配置参数，可自行配置
  // 配置文档参考(https://developers.weixin.qq.com/miniprogram/dev/api/device/bluetooth-ble/wx.writeBLECharacteristicValue.html)
  configuration: {
    BLEFilter: {
      name: '参考'
    },
    startBluetoothDevicesDiscovery: {}
  },

  /**
   * 判断当前的系统是否是ios系统，解决ios初始化蓝牙模块时需要指定mode
   * @returns {Boolean}
   */
  isIOS() {
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
  initBluetooth(mode = 'central') {
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
        if (error.errMsg === 'openBluetoothAdapter:fail already opened') {
          // 已经初始化了蓝牙，无需再次初始化
          this.watchBluetoothDeviceFound() // 监听寻找到设备事件
          this.searchBluetoothDevice() // 初始化成功，开始搜索设备
        }
      }
    })
  },

  /**
   * 关闭蓝牙模块
   */
  closeBluetooth() {
    wx.closeBluetoothAdapter({
      success (res) {
        console.log(res)
      }
    })
  },

  /**
   * 监听蓝牙设备器状态变化
   */
  watchBluetoothStatus() {
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
  searchBluetoothDevice() {
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
        // this.stopSearchBluetoothDevice() // 关闭查找
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
      console.log('获取到的数据==>', res)
      // 过滤寻找到需要连接的蓝牙设备
      // const device = res.devices.filter(v => {
      // })
      // this.connectBLE(device.deviceId)
    })
  },

  /**
   * 点击关闭按钮
   */
  close() {
    this.stopSearchBluetoothDevice() // 关闭寻找设备
    this.closeBluetooth() // 关闭蓝牙模块
  },

  /**
   * 链接蓝牙设备，根据device_id
   */
  connectBLE(deviceId) {
    wx.createBLEConnection({
      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
      deviceId,
      success: res => {
        console.log(res)
      },
      fail: error => {
        console.log('链接失败')
      }
    })
  }
}
