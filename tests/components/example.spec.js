import { mount } from '@vue/test-utils'
import TestUnit from '@/components/TestUnit.vue'

describe('TestUnit.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'Hello world'
    const wrapper = mount(TestUnit, {
      props: {
        msg
      }
    })
    //wrapper.vm相当于this
    //using learn for https://test-utils.vuejs.org/guide/essentials/a-crash-course.html#making-the-test-pass
    expect(wrapper.vm.msg).toMatch(msg)
  })
})
