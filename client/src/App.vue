<template>
  <el-config-provider>
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useOnline } from "@vueuse/core";
import { ElNotification, ElConfigProvider } from "element-plus";

const { t } = useI18n();
const online = useOnline();

watch(online, () => {
  (online.value &&
    ElNotification({
      message: t('network.reconnected'),
      type: "success",
      duration: 6 * 1000,
      showClose: true,
      max: 1,
      position: "bottom-left",
    })) ||
    ElNotification({
      message: t('network.offline'),
      type: "warning",
      duration: 0,
      showClose: true,
      position: "bottom-left",
    });
});
</script>

<style scoped>
.form {
  max-width: 500px;
  margin: auto;
}
</style>
