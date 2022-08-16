<template>
  <div class="CodeGenerator scroll-y pb-5">
    <div class="mt-2 mb-2">
      <el-alert
        title="新一代的低代码生成平台，提供数据源能力，根据数据库字段自动生成基于vue3-admin-plus和micro-service-plus的模版。
      可以使用默认模版和自定义模版生成，经过测试可以为企业提升40%左右的开发效率"
        type="warning"
      />
    </div>
    <!--项目和作者信息配置-->
    <div class="mb-1">项目和作者信息配置</div>
    <el-form ref="refForm" label-width="150px" :inline="true" :model="poaForm" :rules="formRules" class="pr-50px">
      <el-form-item label="author" prop="author" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="poaForm.author" placeholder="author" />
      </el-form-item>
      <el-form-item label="packageName" prop="packageName" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="poaForm.packageName" placeholder="packageName" />
      </el-form-item>
      <el-form-item label="serviceName" prop="serviceName" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="poaForm.serviceName" placeholder="serviceName" />
      </el-form-item>
      <el-form-item label="modalTitle" prop="modalTitle" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="poaForm.modalTitle" placeholder="modalTitle" />
      </el-form-item>
    </el-form>
    <!-- 前端页面参数配置-->
    <div class="mt-3 mb-1">前端页面参数配置</div>
    <el-form ref="refCcForm" label-width="150px" :inline="true" :model="ccForm" :rules="formRules" class="pr-5">
      <el-form-item label="upFileApi" prop="upFileApi" :rules="formRules.isNotNull" label-position="left">
        <el-input v-model="ccForm.upFileApi" placeholder="upFileApi" />
      </el-form-item>
      <el-form-item label="isAdd" prop="isAdd" :rules="formRules.isNotNull" label-position="left">
        <el-switch v-model="ccForm.isAdd" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="isDelete" prop="isDelete" :rules="formRules.isNotNull" label-position="left">
        <el-switch v-model="ccForm.isDelete" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="isMulDelete" prop="isMulDelete" :rules="formRules.isNotNull" label-position="left">
        <el-switch v-model="ccForm.isMulDelete" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="isEdit" prop="isEdit" :rules="formRules.isNotNull" label-position="left">
        <el-switch v-model="ccForm.isEdit" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="isPagination" prop="isPagination" :rules="formRules.isNotNull" label-position="left">
        <el-switch v-model="ccForm.isPagination" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <el-form-item label="isDetail" prop="isDetail" :rules="formRules.isNotNull" label-position="left">
        <el-switch v-model="ccForm.isDetail" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />
      </el-form-item>
      <!--      <el-form-item label="isTableMulChoose" prop="isTableMulChoose" :rules="formRules.isNotNull" label-position="left">-->
      <!--        <el-switch v-model="ccForm.isTableMulChoose" inline-prompt active-color="#13ce66" inactive-color="#ff4949" />-->
      <!--      </el-form-item>-->
    </el-form>
    <!-- 获取库和表信息 -->
    <div class="mb-1 mt-3">获取库和表信息(如想使用，请先提供自己的数据源接口)</div>
    <div class="rowSS">
      <el-input v-model="dataBaseUrl" class="w-500px" placeholder="dataBaseUrl" />
      <el-button type="primary" @click="searchDataBase">查询表</el-button>
    </div>
    <div class="mt-3 mb-1">请选择表(支持多表)</div>
    <el-radio-group v-model="dbRadio" @click.stop>
      <el-radio v-for="(item, index) in dbData" :key="index" :label="item.tableName" @change="dbRadioClick(item)">
        {{ item.tableName }}({{ item.tableComment }})
      </el-radio>
    </el-radio-group>
    <div class="mt-3 mb-1">选中的表</div>
    <el-radio-group v-model="chooseDbRadio">
      <el-radio
        v-for="(item, index) in chooseDbArr"
        :key="index"
        :label="item.tableName"
        @click="dbChooseRadioClick(item)"
      >
        {{ item.tableName }}({{ item.tableComment }})
        <el-button text @click="deleteChooseRadio(index)">删除</el-button>
      </el-radio>
    </el-radio-group>
    <!-- 表信息-->
    <div class="mb-1 mt-3">表信息</div>
    <div class="rowSS mt-1">
      <el-input v-model="dbTableUrl" class="w-500px" placeholder="dbTableUrl" />
      <el-input v-model="tbName" class="w-150px" placeholder="tbName" />
      <el-button :disabled="!tbName" type="primary" @click="searchDbTable">查询表字段</el-button>
    </div>

    <!--  多表关系配置(用于多表查询)  -->
    <div class="mt-3 mb-1">多表字段关系配置</div>
    <div class="mb-1 rowSS">
      <el-input v-model="multiTableName" placeholder="多表实体类名" class="w-150px mr-2" />
      <el-input v-model="multiTableDesc" placeholder="多表相关注释" class="w-150px" />
    </div>
    <div v-for="(item, index) in multiTableConfig" :key="index" class="rowSC">
      <div class="mr-1">{{ item.originTableName }}：</div>
      <el-radio-group v-model="item.orgAssociationKey">
        <el-radio
          v-for="(pkaItem, pkaIndex) in item.priKeyArr"
          :key="pkaIndex"
          :label="pkaItem"
          @click="pkaRadioClick(item, pkaItem)"
        >
          {{ pkaItem }}
        </el-radio>
      </el-radio-group>
      <ElSvgIcon class="ml-1" name="CircleClose" :size="14" style="cursor: pointer" @click="deleteMultiTable(index)" />
    </div>
    <!--  显示表字段信息（可多选） -->
    <div class="mb-1 mt-3 rowSS">
      <div>表字段（点击选择）</div>
      <el-button class="ml-1" type="primary" @click="checkAllColumn">全选</el-button>
    </div>
    <div class="mt-1">
      <el-button
        v-for="(item, index) in tbData"
        :key="index"
        type="success"
        text
        :label="item"
        @click="checkColumnClick(item)"
      >
        {{ item.columnName }}({{ item.columnComment }})
      </el-button>

      <!-- 选中的字段-->
      <div class="mt-3 mb-1">
        <span>选中的字段</span>
        <el-button type="danger" class="ml-1" @click="clearAllColumn">清空</el-button>
      </div>
      <div class="rowSS flex-wrap">
        <div v-for="(item, index) in checkColumnArr" :key="index" class="rowSC mr-2 mt-1">
          <span style="color: #e6a23c">{{ item.columnName }}({{ item.columnComment }})</span>
          <ElSvgIcon name="CircleClose" :size="14" style="cursor: pointer" @click="deleteColumn(index)" />
        </div>
      </div>
      <div v-if="checkColumnArr.length" class="mt-2">
        <el-button type="primary" @click="generatorToSearch">生成到查询</el-button>
        <el-button type="primary" @click="generatorToTable">生成到表格</el-button>
        <el-button type="primary" @click="generatorToForm">生成到表单</el-button>
      </div>
    </div>

    <!--  查询配置  -->
    <div class="mt-3 mb-1">查询配置(支持拖拽排序)</div>
    <SearchTableConfig ref="refSearchTableConfig" />
    <!--  表格配置  -->
    <div class="mt-3 mb-1">表格配置</div>
    <ListTableConfig ref="refListTableConfig" />
    <!--  提交from表单配置  -->
    <div class="mt-3 mb-1">提交from表单配置</div>
    <FormTableConfig ref="refFormTableConfig" />

    <!-- 已定义模版生成-->
    <div class="mt-3 mb-1">已定义模版生成</div>
    <div class="rowSS">
      <el-button type="success" @click="generatorFrontTempZip">生成前端模版(element-plus)</el-button>
      <el-button type="success" @click="generatorBackTempZip">生成后端模版(mybatis-plus支持多表)</el-button>
      <el-button type="success" @click="generatorFrontBackTempZip">生成前后端模版(element-plus&mybatis-plus)</el-button>
    </div>
    <CustomUploadVms ref="refCustomUploadVms" />
  </div>
</template>

<script setup>
import {
  changeDashToCase,
  changeDashToCaseAndFirstWord,
  changeTheFirstWordToCase,
  removeTbOrT,
  tbTypeMapping
} from '@/views/code-generator/generatorUtis'
import CustomUploadVms from './CustomUploadVms.vue'

const { currentTime } = useCommon()
const { formRules, elMessage } = useElement()
import commonUtil from '@/utils/commonUtil'
/*项目和作者信息配置*/
const poaForm = reactive({
  author: '熊猫哥',
  packageName: 'top.kuanghua.integrationfront',
  serviceName: 'integration-front',
  dataTime: '',
  modalTitle: '我是modal的title',
  isMultiTable: false
})
poaForm.dataTime = currentTime
/*前端页面参数配置*/
const ccForm = reactive({
  upFileApi: '/basis-func/upload/file',
  isAdd: true,
  isDelete: true,
  isMulDelete: true,
  isEdit: true,
  isPagination: true,
  isDetail: true,
  isTableMulChoose: true
})
/*获取库和表信息*/
//库
let dataBaseUrl = $ref(
  'https://github.jzfai.top/micro-service-api/basis-func/dataBase/getAllDatabaseOrTable/micro-service-plus'
)
let dbRadio = $ref(null)
let chooseDbArr = $ref([])
let chooseDbRadio = $ref(null)
let dbData = $ref([])
const dbRadioClick = (item) => {
  if (chooseDbArr.length >= 3) {
    elMessage('最多支持3个选择', 'warning')
    return
  }
  if (commonUtil.findArrObjByKey(chooseDbArr, 'tableName', item.tableName)) {
    elMessage(`${item.tableName}已存在`, 'warning')
    return
  }
  chooseDbArr.push(item)
}

//保存tb的信息
let currentTableInfo = $ref({})
const dbChooseRadioClick = (item) => {
  tbName = item.tableName
  tbData = []
  currentTableInfo = {
    tableName: changeDashToCase(removeTbOrT(item.tableName)),
    originTableName: item.tableName,
    tableDesc: item.tableComment,
    tableNameCase: changeTheFirstWordToCase(changeDashToCase(removeTbOrT(item.tableName))),
    uniKey: 'id'
  }
}
const deleteChooseRadio = (index) => {
  chooseDbArr.splice(index, 1)
  tbData = []
}
const searchDataBase = () => {
  let reqConfig = {
    baseURL: dataBaseUrl,
    method: 'get',
    isParams: true
  }
  axiosReq(reqConfig).then(({ data }) => {
    dbData = data
  })
}
//表
let dbTableUrl = $ref(dataBaseUrl)
let tbName = $ref('')
let tbData = $ref([])
let multiTableConfig = $ref([])
const deleteMultiTable = (index) => {
  multiTableConfig.splice(index, 1)
}
const searchDbTable = () => {
  let reqConfig = {
    baseURL: `${dataBaseUrl}/${tbName}`,
    method: 'get',
    isParams: true
  }
  axiosReq(reqConfig).then(({ data }) => {
    //得到主键key
    let priKeyArr = []
    let priKeyItemArr = []
    data.forEach((fItem) => {
      if (fItem.columnKey) {
        priKeyArr.push(fItem.columnName)
        priKeyItemArr.push(fItem)
      }
    })
    //插入表信息
    const firstData = data[0]
    const priKeyArrFirst = priKeyArr[0]
    const priKeyArrLast = priKeyArr[priKeyArr.length - 1]
    const priKeyArrItemFirst = priKeyItemArr[0]
    const priKeyArrItemLast = priKeyItemArr[priKeyItemArr.length - 1]
    if (!commonUtil.findArrObjByKey(multiTableConfig, 'originTableName', firstData.tableName)) {
      let multiTableNameString = ''
      multiTableConfig.forEach((fItem) => {
        multiTableNameString += fItem.tableNameCase.substr(
          fItem.tableNameCase.length - 4,
          fItem.tableNameCase.length - 1
        )
      })
      multiTableName = multiTableNameString

      multiTableConfig.push({
        ...currentTableInfo,
        tableFieldArr: data.map((fItem) => {
          fItem.field = changeDashToCase(fItem.columnName) //_转驼峰
          fItem.desc = fItem.columnComment
          fItem.fieldCase = changeDashToCaseAndFirstWord(fItem.columnName) //_转驼峰
          fItem.originField = fItem.columnName
          fItem.tbName = fItem.columnName
          fItem.type = tbTypeMapping(fItem.dataType)
          return fItem
        }),
        uniKey: changeDashToCase(priKeyArrFirst),
        orgUniKey: priKeyArrFirst,
        uniKeyType: tbTypeMapping(priKeyArrItemFirst.dataType),
        priKeyArr,
        priKeyItemArr,
        orgAssociationKey: priKeyArrLast,
        associationKey: changeDashToCase(priKeyArrLast),
        associationKeyCase: changeTheFirstWordToCase(changeDashToCase(priKeyArrLast)),
        associationKeyType: tbTypeMapping(priKeyArrItemLast.dataType)
      })
    }

    tbData = data
  })
}
//多表关系配置
let multiTableName = $ref(null)
let multiTableDesc = $ref('多表中实体类的注释')
const pkaRadioClick = (item, pkaItem) => {
  item.associationKey = changeDashToCase(pkaItem)
}
//全选
const checkAllColumn = () => {
  checkColumnArr = JSON.parse(JSON.stringify(tbData))
}
const clearAllColumn = () => {
  checkColumnArr = []
}

const checkColumnClick = (cItem) => {
  if (!commonUtil.findArrObjByKey(checkColumnArr, 'columnName', cItem.columnName)) {
    checkColumnArr.push(cItem)
  }
}
const deleteColumn = (dIndex) => {
  checkColumnArr.splice(dIndex, 1)
}
let checkColumnArr = $ref([])
/*显示表字段信息（可多选）*/
//Search
import SearchTableConfig from './SearchTableConfig.vue'
const refSearchTableConfig = $ref(null)
const generatorToSearch = () => {
  refSearchTableConfig.setSearchTableData(checkColumnArr)
}
//table
import ListTableConfig from './ListTableConfig.vue'
const refListTableConfig = $ref(null)
const generatorToTable = () => {
  refListTableConfig.setListTableData(checkColumnArr)
}
//Form
import FormTableConfig from './FormTableConfig.vue'
const refFormTableConfig = $ref(null)
const generatorToForm = () => {
  refFormTableConfig.setFormTableData(checkColumnArr)
}

//生成模板
const generatorSubData = () => {
  return new Promise((resolve) => {
    const searchTableConfig = refSearchTableConfig.getSearchTableData()
    const searchTableGroup = commonUtil.arrGroupByKey(searchTableConfig, 'tableName')
    const listTableConfig = refListTableConfig.getListTableData()
    const listTableGroup = commonUtil.arrGroupByKey(searchTableConfig, 'tableName')
    const formTableConfig = refFormTableConfig.getFormTableData()
    const formTableGroup = commonUtil.arrGroupByKey(searchTableConfig, 'tableName')

    //多表数据处理
    multiTableConfig.forEach((fItem) => {
      fItem.tableQueryArr = searchTableGroup[fItem.originTableName]
      fItem.tableShowArr = listTableGroup[fItem.originTableName]
      fItem.tableFormArr = formTableGroup[fItem.originTableName]
    })

    if (multiTableConfig.length > 1) {
      poaForm.isMultiTable = true
    }

    //取multiTableConfig第一项
    const multiTableFistItem = multiTableConfig[0]
    //设置dbTableConfig
    let dbTableConfig = {
      multiTableName,
      multiTableNameCase: changeTheFirstWordToCase(multiTableName),
      multiTableDesc: multiTableDesc,
      ...multiTableFistItem
    }
    let reqApiPre = ''
    if (poaForm.isMultiTable) {
      reqApiPre = `/${poaForm.serviceName}/${dbTableConfig.multiTableName}`
    } else {
      reqApiPre = `/${poaForm.serviceName}/${dbTableConfig.tableName}`
    }

    ccForm.isTableMulChoose = false
    if (multiTableConfig.length > 1) {
      ccForm.isTableMulChoose = true
    }

    let generatorData = {
      projectOrAuthor: {
        ...poaForm
      },
      commonConfig: {
        ...ccForm
      },
      multiTableConfig,
      dbTableConfig,
      apiConfig: {
        queryApi: `${reqApiPre}/selectPage`,
        queryApiType: 'get',
        insertApi: `${reqApiPre}/insert`,
        insertApiType: 'post',
        updateApi: `${reqApiPre}/updateById`,
        updateApiType: 'update',
        deleteApi: `${reqApiPre}/deleteById`,
        deleteApiType: 'delete',
        deleteMultiApi: `${reqApiPre}/deleteBatchIds`,
        deleteMultiApiType: 'delete',
        detailApi: `${reqApiPre}/selectById`,
        detailApiType: 'get'
      },
      queryConfig: searchTableConfig,
      tableConfig: listTableConfig,
      formConfig: formTableConfig
    }
    resolve(generatorData)
  })
}

/**
 * 生成前端模版
 * @return
 * @author 熊猫哥
 * @date 2022/6/26 14:40
 */
const generatorFrontTempZip = async () => {
  let generatorData = await generatorSubData()
  let reqConfig = {
    url: '/basis-func/generator/generatorFrontTempZip',
    method: 'post',
    isDownLoadFile: true,
    data: generatorData
  }
  axiosReq(reqConfig).then((res) => {
    //得到主键key
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}

/**
 * 生成前端模版
 * @return
 * @author 熊猫哥
 * @date 2022/6/26 14:40
 */
const generatorBackTempZip = async () => {
  let generatorData = await generatorSubData()
  let reqConfig = {
    url: '/basis-func/generator/generatorBackTempZip',
    method: 'post',
    isDownLoadFile: true,
    data: generatorData
  }
  axiosReq(reqConfig).then((res) => {
    //得到主键key
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}

/**
 * 生成前后的模版
 * @return
 * @author 熊猫哥
 * @date 2022/6/26 14:40
 */
const generatorFrontBackTempZip = async () => {
  let generatorData = await generatorSubData()
  let reqConfig = {
    url: '/basis-func/generator/generatorFrontBackTempZip',
    method: 'post',
    isDownLoadFile: true,
    data: generatorData
  }
  axiosReq(reqConfig).then((res) => {
    //得到主键key
    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', decodeURI(res.headers?.exportfilename))
    document.body.appendChild(link)
    link.click()
  })
}

defineExpose({ generatorSubData })
</script>

<style scoped lang="scss"></style>
