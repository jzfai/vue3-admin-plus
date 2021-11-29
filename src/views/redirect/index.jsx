import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router.replace({ path: '/' + path, query })
    })
    return () => <div> </div>
  }
})
