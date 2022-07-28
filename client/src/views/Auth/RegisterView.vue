<template>
  <div>
    <el-form
      ref="formRef"
      status-icon
      scroll-to-error
      :model="form"
      :rules="formRules"
      class="form"
      label-position="right"
      label-width="150px"
      @submit="submit"
    >
      <el-form-item>
        <h1>{{ t('pages.getStated') }}</h1>
      </el-form-item>
      <el-form-item
        :label="t('form.name')"
        prop="name"
        :error="formErrors.name"
      >
        <el-input
          v-model="form.name"
          label="name"
          icon=""
          :placeholder="t('form.name')"
          clearable
        ></el-input>
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
          :placeholder="t('form.email')"
          clearable
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item
        :label="t('form.passwordConfirmation')"
        prop="password_confirmation"
        :error="formErrors.password_confirmation"
      >
        <el-input
          type="password"
          v-model="form.password_confirmation"
          label="password_confirmation"
          :placeholder="t('form.passwordConfirmation')"
          clearable
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :disabled="registerResponse.isFetching"
          bg
          type="primary"
          size="large"
          @click="submit(formRef)"
        >
          {{ t("auth.register") }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
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
  name: "think",
  email: "tranthinh.own@gmail.com",
  password: "123123123",
  password_confirmation: "123123123",
  device_name: ACCESS_TOKEN,
});
const formErrors = ref(initFormErrors());
const registerResponse = ref({});
const formRules = {
  name: [
    {
      required: true,
      message: t("validate.required"),
      trigger: "blur",
    },
  ],
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
  password_confirmation: [
    {
      required: true,
      message: t("validate.required"),
      trigger: "blur",
    },
    {
      validator: formRule_validatePass2,
      trigger: "blur",
    },
  ],
};
function initFormErrors() {
  return {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
}
function formRule_validatePass2(_, value, callback) {
  if (value !== form.password) {
    callback(t("validate.confirmation", [t("validate.password")]));
  } else {
    callback();
  }
}
async function submit(formRef) {
  if (!formRef) return;
  formRef.validate(async (valid) => {
    if (!valid) return;
    formErrors.value = initFormErrors();
    registerResponse.value = await user.register(form);
    if (registerResponse.value.error) {
      return (formErrors.value = { ...registerResponse.value.error });
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
