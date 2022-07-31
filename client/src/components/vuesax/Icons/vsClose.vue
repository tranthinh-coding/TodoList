<template>
  <i ref="icon" class="vs-icon-close" :class="`vs-icon-close-${hover}`"></i>
</template>

<script>
export default {
  name: 'vsClose',
  props: {
    hover: {
      type: String | null,
      default: null
    }
  }
};
</script>

<style>
.vs-icon-close {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.25s ease;
}

.vs-icon-close:before {
  background: rgba(var(--vs-color), 1);
  content: "";
  position: absolute;
  width: 16px;
  transform: rotate(-45deg);
  height: 2px;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.vs-icon-close:after {
  background: rgba(var(--vs-color), 1);
  content: "";
  position: absolute;
  width: 16px;
  height: 2px;
  transform: rotate(45deg);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.vs-icon-close.vs-icon-hover-less:hover:after {
  width: 12px;
  transform: rotate(180deg);
}

.vs-icon-close.vs-icon-hover-less:hover:before {
  width: 12px;
  transform: rotate(180deg);
}
</style>
