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
    }
  },
  setup(props) {
    /*此处写法像极了react*/
    // let {proxy} = getCurrentInstance();
    const { icon } = props
    const renderItem = () => {
      if (icon) {
        if (icon.includes('el-icon')) {
          return <i className={[icon, 'sub-el-icon']} />
        } else {
          return <svg-icon icon-class={icon} className="nav-icon" />
        }
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
