// pages/book-keep/components/table/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /* 表格数据 */
    list: {
      type: Array,
      value: []
    },

    /* 表格的头部信息 */
    head: {
      type: Array,
      value: []
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /* 操作框显示的按钮 */
    operationBtn: [
      {
        name: '编辑',
        type: 'primary',
        event: 'modify'
      },
      {
        name: '删除',
        type: 'warn',
        event: 'delete'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击了按钮
    clickBtn(e) {
      this.triggerEvent(e.currentTarget.dataset.event, {
        index: e.currentTarget.dataset.index
      })
    }
  }
})
