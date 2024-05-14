export const currencyList: object[] = [
  {
    label: '美金',
    value: 'USD'
  },
  {
    label: '港币',
    value: 'HKD'
  },
  {
    label: '英镑',
    value: 'GBP'
  },
  {
    label: '人民币',
    value: 'CNY'
  },
  {
    label: '澳元',
    value: 'AUD'
  },
  {
    label: '新币',
    value: 'SGD'
  },
  {
    label: '日元',
    value: 'JPY'
  }
]

export const asyncFormList: any[] = [
  {
    type: 'select',
    key: 'currency',
    validator: 'select',
    validateTrigger: 'change',
    label: 'Currency',
    options: currencyList
  },
  {
    type: 'input',
    key: 'amount',
    validator: 'number',
    validateTrigger: 'blur',
    label: 'Amount'
  },
  {
    type: 'input',
    key: 'bankAccount',
    validator: 'text',
    validateTrigger: 'blur',
    label: 'Bank Account'
  }
]
