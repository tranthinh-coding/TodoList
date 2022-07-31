<template>
  <div
    class="vs-checkbox-content"
    :class="bindClasses"
    :style="{ '--vs-color': color ? getColor : '' }"
  >
    <div class="vs-checkbox-con">
      <input
        v-bind="$attrs"
        type="checkbox"
        :value="val || notValue"
        :id="_uid"
        class="vs-checkbox"
        :checked="checkedForce || isChecked"
        @input="listenerInput"
        @blur="listenerBlur"
      />
      <div class="vs-checkbox-mask">
        <vs-check v-if="!$slots.icon" :indeterminate="indeterminate" />
        <slot v-else name="icon"></slot>
      </div>
    </div>
    <label
      v-if="label || $slots.default"
      :for="_uid"
      class="vs-checkbox-label"
      :class="lineThrough && 'lineThrough'"
    >
      <div v-if="label">{{ label }}</div>
      <slot v-else></slot>
    </label>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import component from "@/mixins/component.vue";
import vsCheck from "@/components/vuesax/Icons/vsCheck.vue";
import { isArray, includes, isEmpty } from "lodash";
import { randomElementId } from "@/utils"

export default defineComponent({
  inheritAttrs: false,
  name        : "vsCheckbox",
  extends     : component,
  components  : { vsCheck },
  emits       : ["input", "blur", "mousedown", "update:modelValue"],
  props       : {
    modelValue   : {
      type   : [Boolean, String, Array],
      default: ""
    },
    val          : {
      type   : [String, Object],
      default: ""
    },
    notValue     : {
      default: ""
    },
    indeterminate: {
      type   : Boolean,
      default: false
    },
    lineThrough  : {
      type   : Boolean,
      default: false
    },
    checked      : {
      type   : Boolean,
      default: false
    },
    checkedForce : {
      type   : Boolean,
      default: false
    },
    loading      : {
      type   : Boolean,
      default: false
    },
    label: {
      default: null
    },
    labelBefore  : {
      type   : Boolean,
      default: false
    }
  },
  data        : () => ({
    _uid: null
  }),
  watch       : {
    indeterminate (val) {
      this.$emit("update:modelValue", val);
    }
  },
  computed    : {
    bindClasses () {
      return {
        "vs-checkbox--checked"     : this.isChecked,
        "vs-checkbox--disabled"    : this.$attrs.hasOwnProperty("disabled"),
        "vs-checkbox--loading"     : this.loading,
        "vs-checkbox--label-before": this.labelBefore,
        // colors
        "vs-component--primary":
          ! this.danger &&
          ! this.success &&
          ! this.warn &&
          ! this.dark &&
          ! this.color,
        "vs-component--danger" : !! this.danger,
        "vs-component--warn"   : !! this.warn,
        "vs-component--success": !! this.success,
        "vs-component--dark"   : !! this.dark
      };
    },
    isChecked () {
      if (this.modelValue) {
        if (typeof this.modelValue == "boolean") return this.modelValue;
        if (isArray(this.modelValue)) {
          return includes(this.modelValue, this.val) &&
            includes(JSON.stringify(this.modelValue), JSON.stringify(this.val));
        }
        return this.$attrs.hasOwnProperty("checked");
      }
      return false;
    }
  },
  methods     : {
    listenerInput (evt) {
      if (typeof this.modelValue == "boolean") {
        this.$emit("update:modelValue", ! this.modelValue);
      }
      else if (isArray(this.modelValue) && ! isEmpty(this.modelValue)) {
        const array        = this.modelValue;
        const containValue = includes(array, this.val) &&
          includes(JSON.stringify(array), JSON.stringify(this.val));
        let indexVal       = 0;

        array.forEach((item, index) => {
          if (JSON.stringify(item) === JSON.stringify(this.val)) indexVal = index;
        });

        if ( ! containValue) {
          array.push(this.val);
        } else {
          array.splice(indexVal, 1);
        }
        this.$emit("update:modelValue", array);
      }
      else if (this.val !== this.modelValue) {
        this.$emit("update:modelValue", this.val);
      } else {
        this.$emit("update:modelValue", this.notValue || null);
      }
      this.$emit("mousedown", evt);
    },
    listenerBlur(evt) {
      this.$emit('blur', evt);
    }
  },
  mounted () {
    if (this.checked && typeof this.modelValue == "boolean") {
      this.$emit("update:modelValue", true);
    }
    this._uid = randomElementId();
  }
});
</script>

<style>
.vs-checkbox-content {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.vs-checkbox-con {
  width: 23px;
  height: 23px;
  border-radius: 9px;
  position: relative;
  z-index: 1;
}

.vs-checkbox-mask {
  border-radius: 32%;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  pointer-events: none;
  box-sizing: border-box;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: -1;
}

.vs-checkbox-mask i:not(.vs-icon-check) {
  opacity: 0;
  transition: all 0.25s ease;
  color: #fff;
  font-size: 1.1em;
  transform: scale(0.5);
}

.vs-checkbox-mask:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(var(--vs-color), 1);
  transform: scale(0.5);
  border-radius: inherit;
  opacity: 0;
  transition: all 0.25s ease;
  z-index: -1;
}

.vs-checkbox-mask:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  transition: all 0.25s ease;
  z-index: -1;
  border: 2px solid rgba(var(--vs-gray-4), 1);
  box-sizing: border-box;
}

.vs-checkbox-mask .vs-icon-check {
  opacity: 0;
  z-index: 200;
}

.vs-checkbox {
  position: absolute;
  border-radius: inherit;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 100;
  cursor: pointer;
}

.vs-checkbox:disabled {
  opacity: 0;
  pointer-events: none;
}

.vs-checkbox:active ~ .vs-checkbox-mask {
  background: rgba(var(--vs-gray-4), 1) !important;
}

.vs-checkbox:hover ~ .vs-checkbox-mask {
  background: rgba(var(--vs-gray-3), 1);
}

.vs-checkbox:hover ~ .vs-checkbox-mask:before {
  border: 2px solid rgba(var(--vs-gray-4), 0);
}

.vs-checkbox:checked:hover ~ .vs-checkbox-mask {
  box-shadow: 0 3px 15px 0 rgba(var(--vs-color), 0.35);
}

.vs-checkbox:checked ~ .vs-checkbox-mask {
  box-shadow: 0 0 0 0 rgba(var(--vs-color), 0.35);
}

.vs-checkbox:checked ~ .vs-checkbox-mask i:not(.vs-icon-check) {
  opacity: 1;
  transform: scale(1);
  transition: all 0.25s ease 0.15s;
}

.vs-checkbox:checked ~ .vs-checkbox-mask .vs-icon-check {
  opacity: 1;
}

.vs-checkbox:checked ~ .vs-checkbox-mask .vs-icon-check span .line1:after {
  width: 100%;
  transition: all 0.25s ease 0.1s;
}

.vs-checkbox:checked ~ .vs-checkbox-mask .vs-icon-check span .line2:after {
  transition: all 0.2s ease 0.3s;
  height: 100%;
}

.vs-checkbox:checked ~ .vs-checkbox-mask:after {
  opacity: 1;
  transform: scale(1);
}

.vs-checkbox:checked ~ .vs-checkbox-mask:before {
  opacity: 0;
  transform: scale(1.2);
}

.vs-checkbox-label {
  user-select: none;
  cursor: pointer;
  padding: 7px;
  transition: all 0.25s ease;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.44rem;
}

.vs-checkbox-label:before {
  position: absolute;
  width: 0px;
  height: 2px;
  background: rgba(var(--vs-text), 0.6);
  content: "";
  transition: all 0.25s ease;
}

.vs-checkbox--disabled {
  pointer-events: none;
}

.vs-checkbox--disabled .vs-checkbox-label {
  opacity: 0.5;
}

.vs-checkbox--disabled .vs-checkbox-mask {
  opacity: 0.6;
  background: transparent !important;
}

.vs-checkbox--checked .lineThrough {
  opacity: 0.4;
}

.vs-checkbox--checked .lineThrough:before {
  width: calc(100% - 10px);
}

.vs-checkbox--loading {
  pointer-events: none;
}

.vs-checkbox--loading.vs-checkbox--checked .vs-checkbox-mask {
  background: transparent !important;
}

.vs-checkbox--loading.vs-checkbox--checked .vs-checkbox-mask:before {
  border-radius: 50%;
  border: 2px solid rgba(var(--vs-color), 1) !important;
  border-top: 2px solid transparent !important;
  animation: rotateCheckboxLoading 0.6s linear infinite;
  opacity: 1 !important;
}

.vs-checkbox--loading.vs-checkbox--checked .vs-checkbox-mask:after {
  opacity: 0;
  transform: scale(0.5);
}

.vs-checkbox--loading .vs-checkbox-mask {
  background: transparent !important;
}

.vs-checkbox--loading .vs-checkbox-mask:before {
  border-radius: 50%;
  border: 2px solid rgba(var(--vs-gray-4), 1) !important;
  border-top: 2px solid transparent !important;
  animation: rotateCheckboxLoading 0.6s linear infinite;
}

@keyframes rotateCheckboxLoading {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.vs-checkbox--label-before .vs-checkbox-label {
  order: -1;
}
</style>
