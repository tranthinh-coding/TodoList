<template>
  <transition name="slide-left">
    <component class="layout-loader" :is="$route.meta.layout || 'div'">
      <router-view v-slot="{ Component, route }">
        <transition name="slide-left" appear>
          <keep-alive>
            <component class="component-loader" :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </component>
  </transition>
</template>

<script setup>
import { watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useOnline } from "@vueuse/core";
import { ElNotification } from "element-plus";
const { t } = useI18n();
const online = useOnline();

const onl = ref();
const off = ref();

watch(online, () => {
  if (online.value) {
    off.value?.close();
    onl.value = ElNotification({
      message: t("network.reconnected"),
      type: "success",
      duration: 5 * 100,
      showClose: true,
      position: "bottom-left",
    });
  } else {
    onl.value?.close();
    off.value = ElNotification({
      message: t("network.offline"),
      type: "warning",
      duration: 0,
      showClose: true,
      position: "bottom-left",
    });
  }
});
</script>

<style scoped>
.layout-loader {
  position: fixed;
}
.component-loader {
  position: absolute;
}
.component-loader,
.layout-loader {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>
