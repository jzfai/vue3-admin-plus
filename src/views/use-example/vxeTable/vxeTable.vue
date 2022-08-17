<template>
  <vxe-grid ref='xGrid' v-bind="gridOptions"/>
</template>

<script setup name="vxeTable">
import XEUtils from 'xe-utils'
import { VXETable } from 'vxe-table'

const serveApiUrl = ref('https://api.vxetable.cn/demo')

const xGrid = ref()

const gridOptions = reactive({
  border: true,
  showHeaderOverflow: true,
  showOverflow: true,
  keepSource: true,
  id: 'full_edit_1',
  height: 600,
  rowConfig: {
    keyField: 'id',
    isHover: true
  },
  columnConfig: {
    resizable: true
  },
  customConfig: {
    storage: true,
    checkMethod ({ column }) {
      if (['nickname', 'role'].includes(column.field)) {
        return false
      }
      return true
    }
  },
  printConfig: {
    columns: [
      { field: 'name' },
      { field: 'email' },
      { field: 'nickname' },
      { field: 'age' },
      { field: 'amount' }
    ]
  },
  sortConfig: {
    trigger: 'cell',
    remote: true
  },
  filterConfig: {
    remote: true
  },
  pagerConfig: {
    pageSize: 10,
    pageSizes: [5, 10, 15, 20, 50, 100, 200, 500, 1000]
  },
  formConfig: {
    titleWidth: 100,
    titleAlign: 'right',
    items: [
      { field: 'name', title: '名字', span: 8, titlePrefix: { message: '可自定义任何内容', icon: 'vxe-icon-question-circle-fill' }, itemRender: { name: '$input', props: { placeholder: '请输入名称' } } },
      { field: 'email', title: '邮件', span: 8, titlePrefix: { useHTML: true, message: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>', icon: 'vxe-icon-question-circle-fill' }, itemRender: { name: '$input', props: { placeholder: '请输入邮件' } } },
      { field: 'nickname', title: '昵称', span: 8, itemRender: { name: '$input', props: { placeholder: '请输入昵称' } } },
      { field: 'role', title: '角色', span: 8, folding: true, itemRender: { name: '$input', props: { placeholder: '请输入角色' } } },
      { field: 'sex', title: '性别', span: 8, folding: true, titleSuffix: { message: '注意，必填信息！', icon: 'vxe-icon-question-circle-fill' }, itemRender: { name: '$select', options: [] } },
      { field: 'age', title: '年龄', span: 8, folding: true, itemRender: { name: '$input', props: { type: 'number', min: 1, max: 120, placeholder: '请输入年龄' } } },
      { span: 24, align: 'center', collapseNode: true, itemRender: { name: '$buttons', children: [{ props: { type: 'submit', content: '查询', status: 'primary' } }, { props: { type: 'reset', content: '重置' } }] } }
    ]
  },
  toolbarConfig: {
    buttons: [
      { code: 'insert_actived', name: '新增' },
      { code: 'delete', name: '直接删除' },
      { code: 'mark_cancel', name: '删除/取消' },
      { code: 'save', name: '保存', status: 'success' }
    ],
    refresh: true,
    import: true,
    export: true,
    print: true,
    zoom: true,
    custom: true
  },
  proxyConfig: {
    seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
    sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
    filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
    form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
    // 对应响应结果 { result: [], page: { total: 100 } }
    props: {
      result: 'result', // 配置响应结果列表字段
      total: 'page.total' // 配置响应结果总页数字段
    },
    // 只接收Promise，具体实现自由发挥
    ajax: {
      // 当点击工具栏查询按钮或者手动提交指令 query或reload 时会被触发
      query: async ({ page, sorts, filters, form }) => {
        const queryParams = Object.assign({}, form)
        // 处理排序条件
        const firstSort = sorts[0]
        if (firstSort) {
          queryParams.sort = firstSort.field
          queryParams.order = firstSort.order
        }
        // 处理筛选条件
        filters.forEach(({ field, values }) => {
          queryParams[field] = values.join(',')
        })
        const response=await fetch(`${serveApiUrl.value}/api/pub/page/list/${page.pageSize}/${page.currentPage}?${XEUtils.serialize(queryParams)}`)
        return await response.json()
      },
      // 当点击工具栏删除按钮或者手动提交指令 delete 时会被触发
      delete: async ({ body }) => {
        const response=await fetch(`${serveApiUrl.value}/api/pub/save`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        return await response.json()
      },
      // 当点击工具栏保存按钮或者手动提交指令 save 时会被触发
      save: async ({ body }) => {
        const response=await fetch(`${serveApiUrl.value}/api/pub/save`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        return await response.json()
      }
    }
          },
  columns: [
    { type: 'checkbox', title: 'ID', width: 120 },
    { field: 'name', title: 'Name', sortable: true, titlePrefix: { message: '名称必须填写！' }, editRender: { name: 'input', attrs: { placeholder: '请输入名称' } } },
    {
      field: 'role',
      title: 'Role',
      sortable: true,
      titlePrefix: { useHTML: true, content: '点击链接：<a class="link" href="https://vxetable.cn" target="_blank">vxe-table官网</a>' },
      filters: [
        { label: '前端开发', value: '前端' },
        { label: '后端开发', value: '后端' },
        { label: '测试', value: '测试' },
        { label: '程序员鼓励师', value: '程序员鼓励师' }
      ],
      filterMultiple: false,
      editRender: { name: 'input', attrs: { placeholder: '请输入角色' } }
    },
    { field: 'email', title: 'Email', width: 160, editRender: { name: '$input', props: { placeholder: '请输入邮件' } } },
    { field: 'nickname', title: 'Nickname', editRender: { name: 'input', attrs: { placeholder: '请输入昵称' } } },
    {
      field: 'sex',
      title: 'Sex',
      filters: [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      editRender: { name: '$select', options: [], props: { placeholder: '请选择性别' } }
    },
    { field: 'age', title: 'Age', visible: false, sortable: true, editRender: { name: '$input', props: { type: 'number', min: 1, max: 120 } } },
    {
      field: 'amount',
      title: 'Amount',
      formatter ({ cellValue }) {
        return cellValue ? `￥${XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })}` : ''
      },
      editRender:
      { name: '$input', props: { type: 'float', digits: 2, placeholder: '请输入数值' } }
    },
    {
      field: 'updateDate',
      title: 'Update Date',
      width: 160,
      visible: false,
      sortable: true,
      formatter ({ cellValue }) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
      }
    },
    {
      field: 'createDate',
      title: 'Create Date',
      width: 160,
      visible: false,
      sortable: true,
      formatter ({ cellValue }) {
        return XEUtils.toDateString(cellValue, 'yyyy-MM-dd')
      }
    }
  ],
  importConfig: {
    remote: true,
    types: ['xlsx'],
    modes: ['insert'],
    // 自定义服务端导入
    async importMethod ({ file }) {
      const $grid = xGrid.value
      const formBody = new FormData()
      formBody.append('file', file)
      try {
        const response=await fetch(`${serveApiUrl.value}/api/pub/import`, { method: 'POST', body: formBody })
        const data=await response.json()
        VXETable.modal.message({ content: `成功导入 ${data.result.insertRows} 条记录！`, status: 'success' })
        // 导入完成，刷新表格
        $grid.commitProxy('query')
      } catch(e) {
        VXETable.modal.message({ content: '导入失败，请检查数据是否正确！', status: 'error' })
      }
    }
  },
  exportConfig: {
    remote: true,
    types: ['xlsx'],
    modes: ['current', 'selected', 'all'],
    // 自定义服务端导出
    async exportMethod ({ options }) {
      const $grid = xGrid.value
      const proxyInfo = $grid.getProxyInfo()
      // 传给服务端的参数
      const body = {
        filename: options.filename,
        sheetName: options.sheetName,
        isHeader: options.isHeader,
        original: options.original,
        mode: options.mode,
        pager: proxyInfo ? proxyInfo.pager : null,
        ids: options.mode === 'selected' ? options.data.map((item) => item.id) : [],
        fields: options.columns.map((column) => {
          return {
            field: column.field,
            title: column.title
          }
        })
      }
      // 开始服务端导出
      try {
        const response=await fetch(`${serveApiUrl.value}/api/pub/export`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
        const data=await response.json()
        if(data.id) {
          VXETable.modal.message({ content: '导出成功，开始下载', status: 'success' })
          // 读取路径，请求文件
          fetch(`${serveApiUrl.value}/api/pub/export/download/${data.id}`).then(response_1 => {
            response_1.blob().then(blob => {
              // 开始下载
              VXETable.saveFile({ filename: '导出数据', type: 'xlsx', content: blob })
            })
          })
        }
      } catch(e) {
        VXETable.modal.message({ content: '导出失败！', status: 'error' })
      }
    }
  },
  checkboxConfig: {
    labelField: 'id',
    reserve: true,
    highlight: true,
    range: true
  },
  editRules: {
    name: [
      { required: true, message: 'app.body.valid.rName' },
      { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
    ],
    email: [
      { required: true, message: '邮件必须填写' }
    ],
    role: [
      { required: true, message: '角色必须填写' }
    ]
  },
  editConfig: {
    trigger: 'click',
    mode: 'row',
    showStatus: true
  }
})

onMounted(() => {
  const sexList = [
    { label: '女', value: '0' },
    { label: '男', value: '1' }
  ]
  const { formConfig, columns } = gridOptions
  if (columns) {
    const sexColumn = columns[5]
    if (sexColumn && sexColumn.editRender) {
      sexColumn.editRender.options = sexList
    }
  }
  if (formConfig && formConfig.items) {
    const sexItem = formConfig.items[4]
    if (sexItem && sexItem.itemRender) {
      sexItem.itemRender.options = sexList
    }
  }
})
</script>

