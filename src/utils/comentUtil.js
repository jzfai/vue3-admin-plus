export default {
  /* 时间日期*/
  /**
   * 格式化时间
   * @param date 日期
   * @param format 需要转出的格式
   * @returns {*}
   */
  // dateTimeFormatter(date, format) {
  //   if (!date || date === '') {
  //     return ''
  //   }
  //   if (typeof date === 'string') {
  //     var mts = date.match(/(\/Date\((\d+)\)\/)/)
  //     if (mts && mts.length >= 3) {
  //       date = parseInt(mts[2])
  //     }
  //   }
  //   date = new Date(date)
  //   if (!date || date.toUTCString() === 'Invalid Date') {
  //     return ''
  //   }
  //   var map = {
  //     'M': date.getMonth() + 1, // 月份
  //     'd': date.getDate(), // 日
  //     'h': date.getHours(), // 小时
  //     'm': date.getMinutes(), // 分
  //     's': date.getSeconds(), // 秒
  //     'q': Math.floor((date.getMonth() + 3) / 3), // 季度
  //     'S': date.getMilliseconds() // 毫秒
  //   }
  //
  //   format = format.replace(/([yMdhmsqS])+/g, function(all, t) {
  //     var v = map[t]
  //     if (v !== undefined) {
  //       if (all.length > 1) {
  //         v = '0' + v
  //         v = v.substr(v.length - 2)
  //       }
  //       return v
  //     } else if (t === 'y') {
  //       return (date.getFullYear() + '').substr(4 - all.length)
  //     }
  //     return all
  //   })
  //
  //   return format
  // },
  /**
   * 获取星期几
   * @param date 日期字符串
   * return {String}
   */
  dayFormat(date) {
    switch (new Date(date).getDay()) {
      case 0:
        return '星期日'
      case 1:
        return '星期一'
      case 2:
        return '星期二'
      case 3:
        return '星期三'
      case 4:
        return '星期四'
      case 5:
        return '星期五'
      case 6:
        return '星期六'
    }
  },

  /**
   * 计算两个时间差
   * @param {Data} startTime 开始时间（xxxx-xx-xx）
   * @param {Data} endTime   结束时间（xxxx-xx-xx）
   * return xx年xx天  || xx天xx小时 || xx小时xx分
   */
  getDateDiff(startTime, endTime) {
    // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
    startTime = startTime.replace(/\-/g, '/')
    endTime = endTime.replace(/\-/g, '/')
    let sTime = new Date(startTime) // 开始时间
    let eTime = new Date(endTime) // 结束时间
    let timeOff = eTime - sTime // 相差时间戳（毫秒数）
    let timeMinute = 1000 * 60
    let timeHour = 1000 * 3600
    let timeDay = 1000 * 3600 * 24
    let timeYear = 1000 * 3600 * 24 * 365
    if (timeOff / timeYear >= 1) {
      return parseInt(timeOff / timeYear) + '年' + parseInt((timeOff % timeYear) / timeDay) + '天'
    } else if (timeOff / timeDay >= 1) {
      return parseInt(timeOff / timeDay) + '天' + parseInt((timeOff % timeDay) / timeHour) + '小时'
    } else {
      return parseInt(timeOff / timeHour) + '小时' + parseInt((timeOff % timeHour) / timeMinute) + '分'
    }
  },
  /* today 是今天的时间戳(new Date().getTime()) */
  minStartDate(today, day) {
    const dayDiff = day * 24 * 60 * 60 * 1000 // day（多少天）的时间戳
    const minStartTime = today - dayDiff
    // dateTimeFormatter是第一个时间类的方法
    return this.dateTimeFormatter(minStartTime, 'yyyy-MM-dd')
  },
  /* 获取两个日期相差天数
   * */
  dateDiff(sDate1, sDate2) {
    let arrDate, objDate1, objDate2, iDays
    arrDate = sDate1.split('-')
    objDate1 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
    arrDate = sDate2.split('-')
    objDate2 = new Date(arrDate[1] + '/' + arrDate[2] + '/' + arrDate[0])
    iDays = parseInt(Math.abs(objDate1 - objDate2) / 1000 / 60 / 60 / 24) // 相差毫秒数转成天数
    return iDays
  },
  /*
   * 获得今天周几
   * */
  getWeek() {
    return '星期' + '日一二三四五六'.charAt(new Date().getDay())
    // this.showDate=this.$momentMini(new Date()).format('YYYY年MM月DD日，')+str
  },
  /* 表单验证*/
  // 匹配手机
  mobilePhone(str) {
    const reg = /^0?1[0-9]{10}$/
    return reg.test(str)
  },
  /*
   * 传入一串num四个 一个空格
   * */
  toSplitNumFor(num) {
    return num.replace(/(.{4})/g, '$1 ')
  },
  // 匹配银行卡号
  bankCardNo(str) {
    const reg = /^\d{15,20}$/
    return reg.test(str)
  },
  // 邮箱
  regEmail(str) {
    const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    return reg.test(str)
  },
  // 省份证
  idCardNumber(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
  },
  /* 价格精度转换*/
  // 乘法
  mul(arg1, arg2) {
    const r1 = arg1.toString()
    const r2 = arg2.toString()
    let m
    let resultVal
    const d = arguments[2]
    m = (r1.split('.')[1] ? r1.split('.')[1].length : 0) + (r2.split('.')[1] ? r2.split('.')[1].length : 0)
    resultVal = (Number(r1.replace('.', '')) * Number(r2.replace('.', ''))) / Math.pow(10, m)
    return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
  },
  div: function (arg1, arg2) {
    const r1 = arg1.toString()
    const r2 = arg2.toString()
    let m
    let resultVal
    const d = arguments[2] || 2
    m = (r2.split('.')[1] ? r2.split('.')[1].length : 0) - (r1.split('.')[1] ? r1.split('.')[1].length : 0)
    resultVal = (Number(r1.replace('.', '')) / Number(r2.replace('.', ''))) * Math.pow(10, m)
    return typeof d !== 'number' ? Number(resultVal) : Number(resultVal.toFixed(parseInt(d)))
  },
  add: function (arg1, arg2) {
    arg1 = arg1.toString()
    arg2 = arg2.toString()
    const arg1Arr = arg1.split('.')
    const arg2Arr = arg2.split('.')
    const d1 = arg1Arr.length === 2 ? arg1Arr[1] : ''
    const d2 = arg2Arr.length === 2 ? arg2Arr[1] : ''
    const maxLen = Math.max(d1.length, d2.length)
    const m = Math.pow(10, maxLen)
    const result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen))
    const d = arguments[2]
    return typeof d === 'number' ? Number(result.toFixed(d)) : result
  },
  sub: function (arg1, arg2) {
    return this.add(arg1, -Number(arg2), arguments[2])
  },
  /* 常用数组操作*/
  /*
   * 删除数组中的指定元素
   * arrItem 数组的index下标
   * return 删除后的数组
   * */
  deleteArrItem(arr, arrItem) {
    arr.splice(
      arr.findIndex((item) => item === arrItem),
      1
    )
  },
  /*
   *  数组去重
   *  arr：要去重的数组
   *  return 去重后的数组
   * */
  arrToRepeat(arr) {
    return arr.filter((ele, index, thisArr) => {
      // 因为indexOf返回元素出现的第一个index位置,如果有重复的话那么他的位置永远是第一次出现的index,这就与他本身的index不相符,则删掉.
      return thisArr.indexOf(ele) === index
    })
  },
  /*
   * 数组去重
   * seriesArr: 数组
   * return 去重后的数组
   * */
  deRepeatArr(seriesArr) {
    return [...new Set(seriesArr)]
  },
  /*
   * 根据arrObj 删除arrObj2   根据arrObj objKey查找删除
   * arrObj: 数组对象
   * arrObj2: 要被删除的对象
   * objKey： arrObj中对象的某一个key名称
   * return: arrObj2删除过后的数组
   * */
  byArrObjDeleteArrObj2(arrObj, arrObj2, objKey) {
    arrObj
      .map((value) => {
        return value[objKey]
      })
      .forEach((value2) => {
        arrObj2.splice(
          arrObj2.findIndex((item) => item[objKey] === value2),
          1
        )
      })
    return arrObj2
  },
  /*
   * 删除arrObj某一项 根据objKey中的key的值等于value的值
   * arrObj: 数组对象
   * objKey：arrObj中对象的某一个key名称
   * return: arrObj删除过后的数组
   * */
  deleteArrObjByKey(arrObj, objKey, value) {
    //foreach splice
    //for substring  slice 不改变原数组
    arrObj.splice(
      arrObj.findIndex((item) => item[objKey] === value),
      1
    )
    return arrObj
  },
  /*
   * 查找arrObj某一项 根据objKey中的值
   * arrObj: 数组对象
   * objKey：arrObj中对象的某一个key名称
   * return: arrObj查找 过后的数组
   * */
  findArrObjByKey(arrObj, objKey, value) {
    return arrObj[arrObj.findIndex((item) => item[objKey] === value)]
  },
  /*
   * 根据arrObj 筛选arrObj2   根据arrObj objKey值查找
   * arrObj: 数组对象
   * arrObj2: 要被删除的对象
   * objKey： arrObj中对象的某一个key名称
   * return: arrObj2删除过后的数组
   * */
  byArrObjFindArrObj2(arrObj, arrObj2, objKey) {
    let arrObj3 = []
    arrObj
      .map((value) => {
        return value[objKey]
      })
      .forEach((value2) => {
        let arrIndex = arrObj2.findIndex((item) => item[objKey] === value2)
        if (arrIndex !== -1) {
          arrObj3.push(arrObj2[arrIndex])
        }
      })
    return arrObj3
  }
}
