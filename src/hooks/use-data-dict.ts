import useDictStore from "@/store/dict";
import {dictDataReq} from "@/api/dict"


//字典枚举，根据value返回选中的项
export const getItem= async (dictType,value,key) =>{
  if(getDict(dictType).length){
    const itemObj = getDict(dictType).find((item:any)=>{
      return item.dictValue==value
    })
    if(key&&itemObj?.key){
      return itemObj[key]
    }else{
      return  itemObj
    }
  }else{
    const {data}=await dictDataReq(dictType)
    const itemObj = data.find((item:any)=>{
      return item.dictValue==value
    })
    if(key&&itemObj?.key){
      return itemObj[key]
    }else{
      return  itemObj
    }
  }
}
export const getLabel=(dictType,value)=>{
  return getItem(dictType,value,"dictLabel")
}

export const getValue=(dictType,value)=>{
  return getItem(dictType,value,"dictValue")
}

//如果 store中有值取 store，没有请求设置 store
const {getDict,setDict} = useDictStore();
export const useDict=(dictTypes)=>{
  const dictTypeMap:any=reactive({})
  dictTypes?.forEach((item)=>{
    dictTypeMap[item]=[]
    if(getDict(item).length){
      dictTypeMap[item]=getDict(item)
    }else{
      dictDataReq(item).then(resp=>{
        const dillData=resp.data.map((p)=>{
          p.label= p.dictLabel
          p.value= p.dictValue
          p.elTagType= p.listClass
          p.elTagClass= p.cssClass
          return p;
        })
        dictTypeMap[item]=dillData;
        setDict(item,dillData)
      })
    }
  })
  return toRefs(dictTypeMap)
}


