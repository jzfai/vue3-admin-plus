<template>
  <svg :class="svgClass" aria-hidden="true">
    <!--<use :xlink:href="iconName" :fill="color"/>-->
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { computed, defineComponent } from 'vue'
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
    // color: {
    //   type: String,
    //   default: '#889aa4',
    // },
  },
  setup(props) {
    return {
      iconName: computed(() => `#icon-${props.iconClass}`),
      svgClass: computed(() => {
        if (props.className) {
          return `svg-icon ${props.className}`
        }
        return 'svg-icon'
      })
    }
  }
})
</script>

<style scope>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
}
</style>
