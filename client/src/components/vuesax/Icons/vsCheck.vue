<template>
  <i class="vs-icon-check" :class="indeterminate && 'indeterminate'">
    <span>
      <div class="line1"></div>
      <div class="line2"></div>
    </span>
  </i>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "vsCheck",
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<style>
.vs-icon-check {
  width: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  border-radius: inherit;
}

.vs-icon-check span {
  transform: rotate(45deg);
  display: block;
  position: relative;
  width: 8px;
  height: 13px;
  margin-top: -4px;
}

.vs-icon-check span .line1 {
  background: transparent;
  content: "";
  position: absolute;
  height: 2px;
  transition: all 0.2s ease;
  border-radius: 5px;
  z-index: 100;
  width: 8px;
  bottom: 0;
}

.vs-icon-check span .line1:after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  background: #fff;
  transition: all 0.25s ease;
  border-radius: 100px 5px 50px 5px;;
}

.vs-icon-check span .line2 {
  bottom: 0;
  right: 0;
  z-index: 100;
  border-radius: 5px;
  background: transparent;
  content: "";
  position: absolute;
  height: 13px;
  transition: all 0.2s ease;
  width: 2px;
}

.vs-icon-check span .line2:after {
  content: "";
  position: absolute;
  width: 2px;
  height: 0;
  background: #fff;
  transition: all 0.25s ease;
  bottom: 0;
  border-radius: 100px 4px 50px 5px;
}

.vs-icon-check.active:before {
  width: 8px;
}

.vs-icon-check.active:after {
  width: 4px;
}

.vs-icon-check.indeterminate span {
  transform: rotate(0);
  height: auto;
  margin: 0;
  width: auto;
}

.vs-icon-check.indeterminate span:after {
  position: relative;
  content: "";
  width: 10px;
  height: 2px;
  border-radius: 2px;
  background: #fff;
  display: block;
}

.vs-icon-check.indeterminate span .line1 {
  transform: rotate(-45deg);
  bottom: 0;
  right: -1px;
  opacity: 0;
  display: none;
}

.vs-icon-check.indeterminate span .line2 {
  right: 0 !important;
  bottom: -0.14rem !important;
  transform: rotate(45deg) !important;
  transition: all 0.25s ease !important;
  height: 11px !important;
  display: none;
}
</style>
