interface IValidators {
  select: any,
  number: any,
  text: any
}

const validators: IValidators = {
  select: (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error('This field is required'))
    } else {
      callback()
    }
  },
  number: (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error('This field is required'))
    } else {
      if (/^\d+$/.test(value)) {
        callback()
      } else {
        callback(new Error('Only numbers'))
      }
    }
  },
  text: (rule: any, value: any, callback: any) => {
    if (!value) {
      callback(new Error('This field is required'))
    } else {
      callback()
    }
  }
}

export default validators
