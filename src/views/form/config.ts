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

export const currencyI18NList: object[] = [
  {
    label: {
      zh: '美金',
      en: 'USD'
    },
    value: 'USD'
  },
  {
    label: {
      zh: '港币',
      en: 'HKD'
    },
    value: 'HKD'
  },
  {
    label: {
      zh: '英镑',
      en: 'GBP'
    },
    value: 'GBP'
  },
  {
    label: {
      zh: '人民币',
      en: 'CNY'
    },
    value: 'CNY'
  },
  {
    label: {
      zh: '澳元',
      en: 'AUD'
    },
    value: 'AUD'
  },
  {
    label: {
      zh: '新币',
      en: 'SGD'
    },
    value: 'SGD'
  },
  {
    label: {
      zh: '日元',
      en: 'JPY'
    },
    value: 'JPY'
  }
]

export const asyncRegFormList: any[] = [
  {
    type: 'select',
    key: 'currency',
    required: true,
    trigger: 'change',
    filterable: true,
    clearable: true,
    label: {
      zh: '币种',
      en: 'Currency'
    },
    placeholder: {
      zh: '请选择币种',
      en: 'Please select Currency'
    },
    blankErrorMessage: {
      zh: '此字段必需',
      en: 'This field is required'
    },
    options: currencyI18NList
  },
  {
    type: 'input',
    key: 'documentNumber',
    label: {
      zh: '付款方CNPJ',
      en: 'CNPJ Of Payer'
    },
    blankErrorMessage: {
      zh: '此字段必需',
      en: 'This field is required.'
    },
    trigger: 'blur',
    required: true,
    reg: `^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}\\-\\d{2}$`,
    errorMessage: {
      zh: '请检查 CNPJ 格式是否正确（XX.XXX.XXX/XXXX-XX）， 比如 11.111.111/1111-11',
      en: 'Invalid CNPJ, expect (XX.XXX.XXX/XXXX-XX), like 11.111.111/1111-11'
    },
    basicAssert: {
      key: 'currency',
      values: ['USD', 'HKD', 'GBP']
    },
    inputType: '',
    placeholder: {
      zh: '请填写 CNPJ',
      en: 'Please enter CNPJ'
    },
    style: {
      width: '500px'
    }
  },
  {
    type: 'input',
    key: 'accountNo',
    required: true,
    trigger: 'blur',
    label: {
      zh: '账号',
      en: 'Account Number'
    },
    placeholder: {
      zh: '请填写账号',
      en: 'Please enter Account Number'
    },
    blankErrorMessage: {
      zh: '账号必填',
      en: 'Account Number is required.'
    }
  }
]
