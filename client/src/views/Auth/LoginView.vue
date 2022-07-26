<template>
  <el-form
    ref="formRef"
    status-icon
    scroll-to-error
    :model="form"
    :rules="formRules"
    class="form"
    label-position="right"
    label-width="100px"
    @submit="submit"
  >
    <el-form-item :label="t('auth.email')" prop="email" :error="formErrors.email">
      <el-input
        v-model="form.email"
        label="email"
        :placeholder="t('auth.email')"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item :label="t('auth.password')" prop="password" :error="formErrors.password">
      <el-input
        type="password"
        v-model="form.password"
        label="password"
        :placeholder="t('auth.password')"
        clearable
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="isFetching"
        
        type="primary"
        size="large"
        @click="submit(formRef)"
        >{{ t("auth.login") }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useUser } from "@/store/useUser";
import { useFetch } from "@/composables/useFetch";
import { LOGIN_API, TokenKey } from "@/config/app";
import { ElMessage } from "element-plus";

const { t } = useI18n();

const user = useUser();
const formRef = ref();
const form = reactive({
  email: "tranthinh.own@gmail.com",
  password: "123123123",
  device_name: TokenKey,
});
const formErrors = ref(initFormErrors());
const { data, error, isFetching, execute } = useFetch(LOGIN_API, {
  method: "post",
  immediate: false,
})
  .post(form)
  .json();

const formRules = {
  email: [
    {
      required: true,
      message: t('form.required'),
      trigger: "blur",
    },
    {
      type: "email",
      message: t('form.email'),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t('form.required'),
      trigger: "blur",
    },
  ],
};
function initFormErrors() {
  return {
    email: "",
    password: "",
  };
}
async function submit(formRef) {
  if (!formRef) return;
  formRef.validate(async (valid) => {
    if (!valid) return;
    formErrors.value = initFormErrors();
    await execute();
    if (error.value) {
      typeof error.value == "string" &&
        ElMessage({
          message: error.value,
          type: "error",
          duration: 5 * 1000,
        });
      return (formErrors.value = { ...error.value });
    }
    ElMessage({
      message: t('auth.loginSuccess'),
      type: "success",
      duration: 5 * 1000,
    });
    user.saveUser({ ...data.value, loginStatus: true });
  });
}
</script>

<style scoped>
.form {
  max-width: 500px;
  margin: auto;
}
</style>
