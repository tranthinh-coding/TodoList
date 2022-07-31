<template>
  <i ref="icon" class="vs-icon-plus" :class="less && 'less'"></i>
</template>

<script>
export default {
  name: "vsPlus",
  props: {
    less: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.vs-icon-plus {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all .25s ease;
  cursor: pointer;
}

.vs-icon-plus:before {
  background: rgba(var(--vs-color), 1);
  content: '';
  position: absolute;
  width: 14px;
  transform: rotate(0deg);
  height: 2px;
  border-radius: 2px;
  transition: all .3s ease;
}

.vs-icon-plus:after {
  background: rgba(var(--vs-color), 1);
  content: '';
  position: absolute;
  width: 14px;
  height: 2px;
  transform: rotate(90deg);
  border-radius: 2px;
  transition: all .4s ease;
}

.vs-icon-plus:hover:not(.less) {
  transform: rotate(-90deg);
}

.vs-icon-plus.less:hover {
  transform: scale(0.75);
}

.vs-icon-plus.less:after {
  transform: rotate(180deg);
}
</style>
