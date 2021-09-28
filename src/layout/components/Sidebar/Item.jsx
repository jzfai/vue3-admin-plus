/*使用vue3.0 jsx语法书写*/
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    elIcon: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    /*此处写法像极了react*/
    // let {proxy} = getCurrentInstance();
    const { icon } = props
    const renderItem = () => {
      if (icon) {
        // element-plus remove el-icon
        // view https://element-plus.org/zh-CN/component/icon.html
        // if (icon.includes('el-icon')) {
        //   return <i className={[icon, 'sub-el-icon']} />
        // } else {
        //   return <svg-icon icon-class={icon} className="nav-icon" />
        // }
        return <svg-icon icon-class={icon} className="nav-icon" />
      }
    }
    return () => {
      return renderItem()
    }
    // return () => (
    //   <div>{renderItem()}</div>
    // )
  }
})
