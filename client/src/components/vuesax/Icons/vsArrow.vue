<template>
  <i ref="icon" class="vs-icon-arrow" :class="less && 'less'"></i>
</template>

<script>
export default {
  name: 'vsArrow',
  props: {
    less: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.vs-icon-arrow {
  pointer-events: none;
  width: 7px;
  height: 7px;
  transform: rotate(-135deg);
  transition: all 0.25s ease;
  transform-origin: center;
}

.vs-icon-arrow:after {
  content: "";
  width: 100%;
  height: 1px;
  background: rgba(var(--vs-text), 1);
  position: absolute;
  display: block;
  top: 0px;
}

.vs-icon-arrow:before {
  top: 0px;
  content: "";
  width: 1px;
  height: 100%;
  position: absolute;
  display: block;
}
</style>
