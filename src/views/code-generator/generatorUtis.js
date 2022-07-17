/*
 * generator 工具方法
 * @author: 熊猫哥
 * */

/*
 * ‘_’连接转为驼峰
 * //- hyphen
 * */
export const changeDashToCase = (str) => {
  if (str && str.includes('_')) {
    let changeStr = ``
    let arr = str.split(`_`)
    let newArr = arr.map((ele, idx) => {
      return idx === 0 ? ele : ele[0].toUpperCase() + ele.slice(1)
    })
    changeStr = newArr.join(``)
    return changeStr
  }
  return str
}

//首字母转大写和_转驼峰
export const changeDashToCaseAndFirstWord = (str) => {
  if (!str) return str
  let changeStr = ``
  if (str && str.includes('_')) {
    let arr = str.split(`_`)
    let newArr = arr.map((ele, idx) => {
      return idx === 0 ? ele : ele[0].toUpperCase() + ele.slice(1)
    })
    changeStr = newArr.join(``)
  }
  changeStr = changeStr || str
  changeStr = changeStr.slice(0, 1).toUpperCase() + changeStr.slice(1)
  return changeStr
}

//首字母转大写
export const changeTheFirstWordToCase = (str) => {
  if (typeof str === 'string') {
    return str.slice(0, 1).toUpperCase() + str.slice(1)
  }
  return str
}

//移除tb_,t_
export const removeTbOrT = (tableName) => {
  return tableName.replace('tb_', '').replace('t_', '')
}

/**
 * 类型映射
 * @param type 数据库类型
 * @return  java类型
 * @author 熊猫哥
 * @date 2022/6/4 9:54
 */
export const tbTypeMapping = (type) => {
  // varchar,char,text,longText -->String
  // decimal->Double
  // int,bit,tinyint->Integer
  // bigInt->Long
  //datetime,timestamp->Date
  //Date->Object
  if ('varchar,char,text,longText'.includes(type)) {
    return 'String'
  } else if ('decimal'.includes(type)) {
    return 'Double'
  } else if ('int,bit,tinyint'.includes(type)) {
    return 'Integer'
  } else if ('bigint'.includes(type)) {
    return 'Long'
  } else if ('datetime,timestamp'.includes(type)) {
    return 'Date'
  } else if ('Date'.includes(type)) {
    return 'Date'
  } else {
    return '未知类型' + type
  }
}

/**
 * 前端组件类型
 * @return
 * @author 熊猫哥
 * @date 2022/6/4 10:44
 */
export const componentTypeArr = [
  { label: 'input', title: 'input' },
  { label: 'textarea', title: 'textarea' },
  { label: 'select', title: 'select' },
  { label: 'selectApi', title: 'selectApi' },
  { label: 'cascaderApi', title: 'cascaderApi' },
  { label: 'radio', title: 'radio' },
  { label: 'checkbox', title: 'checkbox' },
  { label: 'switch', title: 'switch' },
  { label: 'datetimerange', title: 'datetimerange' },
  { label: 'datetime', title: 'datetime' },
  { label: 'date', title: 'date' },
  { label: 'uploadImage', title: 'uploadImage' },
  { label: '', title: '空类型' }
]

//查询的组件类型
export const searchTableComponentTypeArr = [
  { label: 'input', title: 'input' },
  { label: 'select', title: 'select' },
  { label: 'selectApi', title: 'selectApi' },
  { label: 'cascaderApi', title: 'cascaderApi' },
  { label: 'datetimerange', title: 'datetimerange' },
  { label: 'datetime', title: 'datetime' },
  { label: 'date', title: 'date' },
  { label: '', title: '空类型' }
]

//table的组件类型
export const listTableComponentTypeArr = [
  { label: 'input', title: 'input' },
  { label: 'select', title: 'select' },
  { label: 'image', title: 'image' },
  { label: '', title: '空类型' }
]

/**
 * 组件类型映射
 * @param null
 * @return
 * @author 熊猫哥
 * @date 2022/6/4 10:23
 */
const commitTail = ':'
const commitExampleTail = '='
const commitExampleSplit = ','
export const componentTypeMapping = (type, commont, field) => {
  if (field.includes('id')) {
    return ''
  }
  if (commont.includes(commitTail) || commont.includes(commitExampleTail)) {
    return 'select'
  }
  if ('datetime,timestamp,Date,time'.includes(type)) {
    return 'datetime'
  }
  return 'input'
}

export const listTableComponentTypeMapping = (type, commont, field) => {
  if (field.includes('id')) {
    return ''
  }
  if (commont.includes(commitTail) || commont.includes(commitExampleTail)) {
    return 'select'
  }
  // if ('datetime,timestamp,Date,time'.includes(type)) {
  //   return 'datetime'
  // }
  return 'input'
}

//资管家校验规则
export const ruleMapping = [
  { key: 'isNotNull', label: '必填' },
  { key: 'positiveInteger', label: '整数' },
  { key: 'positiveIntegerNotZero', label: '大于O的整数' }
]

//desc截取
export const splitDescReturnDesc = (desc) => {
  if (isSelectType(desc)) {
    desc = desc.replace(/[\r\n\t]/g, '').replace(/\ +/g, '')
    const index = desc.indexOf(commitTail)
    return desc.substring(0, index)
  }
  return desc
}

export const splitDescReturnOptionData = (desc) => {
  if (isSelectType(desc)) {
    desc = desc.replace(/[\r\n\t]/g, '').replace(/\ +/g, '')
    const index = desc.indexOf(commitTail)
    return desc.substr(index + 1)
  }
  return ''
}

/**
 *
 * @param string 传入的string
 * @example '1=大于短信,2=阿里短信'
 * @return
 * @author 邝华
 * @email kuanghua@aulton.com
 * @date 2022-06-09 14:33
 */
const { elMessage } = useElement()
export const isSelectType = (desc) => {
  return desc.includes('1=')
}
export const splitTheOptionArr = (string) => {
  if (!string) {
    return []
  }
  if (!isSelectType(string)) {
    elMessage(string + '传入有误', 'warning')
    return []
  }
  let tsArr = string.split(commitExampleSplit)
  tsArr = tsArr.map((mfItem) => {
    //去除空格和换行
    return mfItem.replace(/[\r\n]/g, '').replace(/\ +/g, '')
  })

  return tsArr.map((mItem) => {
    let splitArr = mItem.split(commitExampleTail)
    return {
      value: splitArr[0],
      label: splitArr[1]
    }
  })
}
