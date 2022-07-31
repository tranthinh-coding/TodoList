<script>
import { defineComponent } from "vue"
import { getColor } from "@/utils"

export default defineComponent({
  props: {
    color: {
      type: String,
      default: null,
    },
    danger: {
      type: Boolean,
      default: false
    },
    success: {
      type: Boolean,
      default: false
    },
    warn: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    primary: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
  },
  data: () => ({
    componentColor: null,
    getColor: null,
  }),
  computed: {
    isColorDark() {
      return this.color === 'dark' || this.dark || this.componentColor === 'dark'
    },
    isColor() {
      return !!this.color || !!this.primary || !!this.success || !!this.warn || !!this.danger || !!this.dark
    }
  },
  mounted() {
    this.getColor = getColor(this.color)
  }
});
</script>
