<template>
  <el-form
    ref="formRef"
    status-icon
    scroll-to-error
    :model="form"
    :rules="formRules"
    class="form"
    label-position="top"
    label-width="100px"
    @submit="submit"
  >
    <el-form-item>
      <h1 class="form-header">{{ t("pages.welcomeBack") }}</h1>
    </el-form-item>
    <el-form-item
      :label="t('form.email')"
      prop="email"
      :error="formErrors.email"
    >
      <el-input
        v-model="form.email"
        label="email"
        :placeholder="t('form.email')"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item
      :label="t('form.password')"
      prop="password"
      :error="formErrors.password"
    >
      <el-input
        type="password"
        v-model="form.password"
        label="password"
        :placeholder="t('form.password')"
        clearable
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item prop="remember_me">
      <el-checkbox
        v-model="form.remember_me"
        name="remember_me"
        :label="t('form.rememberMe')"
      ></el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="loginResponse.isFetching"
        type="primary"
        size="large"
        class="form-submit"
        @click="submit(formRef)"
        >{{ t("auth.login") }}</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUser } from "@/store/useUser";
import { ACCESS_TOKEN } from "@/config/app";

const { t } = useI18n();
const router = useRouter();
const user = useUser();
const formRef = ref();
const form = reactive({
  email: "tranthinh.own@gmail.com",
  password: "123123123",
  device_name: ACCESS_TOKEN,
  remember_me: false,
});
const formErrors = ref(initFormErrors());
const loginResponse = ref({});
const formRules = {
  email: [
    {
      required: true,
      message: t("validate.required"),
      trigger: "blur",
    },
    {
      type: "email",
      message: t("validate.email"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("validate.required"),
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
    loginResponse.value = await user.login(form);
    if (loginResponse.value.error) {
      return (formErrors.value = { ...loginResponse.value.error });
    }
    return router.push({ name: "home", params: {} });
  });
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap');

.form {
  max-width: 40rem;
  margin: auto;
  background-color: var(--el-bg-color-overlay);
  max-height: max-content;
  min-height: 40rem;
  padding: 2.8rem;
  border-radius: var(--el-border-radius-base);
}
.form-header {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 1.8rem;
  color: var(--el-color-primary);
  text-align: center; 
  width: 100%;
  font-family: 'Ubuntu', sans-serif;
}
.form-submit {
  width: 100%;
}
</style>
