<template>
  <el-form
    ref="formRef"
    status-icon
    scroll-to-error
    :model="form"
    :rules="formRules"
    class="form rounded-xl"
  >
    <el-form-item>
      <h1 class="form-header">{{ t("pages.welcomeBack") }}</h1>
    </el-form-item>
    <el-form-item prop="email" :error="formErrors.email">
      <el-input
        v-model="form.email"
        label="email"
        :placeholder="t('form.email')"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" :error="formErrors.password">
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
      <vs-checkbox
        v-model="form.remember_me"
        name="remember_me"
        :label="t('form.rememberMe')"
      />
    </el-form-item>
    <el-form-item>
      <el-button
        :disabled="isFetching"
        class="form-submit"
        @click.pvent="submit(formRef)"
        type="primary"
      >
        {{ t("auth.login") }}
      </el-button>
    </el-form-item>
    <el-form-item size="large">
      <span>
        {{ t("auth.haveNotAnAccount") }}
        <el-link type="primary">
          <router-link :to="{ name: 'register' }">{{ t("auth.register") }}</router-link>
        </el-link>
      </span>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUser } from "@/store/useUser";
import { ACCESS_TOKEN, LOGIN_API, REMEMBER_TOKEN } from "@/config/app";
import { useFetch } from "@/composables/useFetch";
import { ElMessage } from "element-plus";

const { t }      = useI18n();
const router     = useRouter();
const user       = useUser();
const formRef    = ref();
const form       = reactive({
  email      : "tranthinh.own@gmail.com",
  password   : "123123123",
  device_name: ACCESS_TOKEN,
  remember_me: true
});
const formErrors = ref(initFormErrors());
const formRules  = {
  email   : [
    {
      required: true,
      message : t("validate.required"),
      trigger : "blur"
    },
    {
      type   : "email",
      message: t("validate.email"),
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message : t("validate.required"),
      trigger : "blur"
    }
  ]
};
const isFetching = ref(false);

function initFormErrors () {
  return {
    email   : "",
    password: ""
  };
}

const { data, error, execute: fetchExecute } = useFetch(LOGIN_API, {
  method   : "post",
  immediate: false
}).post(form).json();

function submit (formRef) {
  if ( ! formRef) return;
  formRef.validate(async (valid) => {
    if ( ! valid) return;
    isFetching.value = true;
    formErrors.value = initFormErrors();
    await fetchExecute();
    isFetching.value = false;
    if (error.value) {
      typeof error.value == "string"
      && ElMessage({
        message  : error.value,
        type     : "error",
        duration : 8 * 1000,
        showClose: true
      });
      return (formErrors.value = { ...error.value });
    }
    user.saveUser(data.value);
    ElMessage({
      message  : t("auth.loginSuccess"),
      type     : "success",
      duration : 1.5 * 1000,
      showClose: true
    });
    return router.push({ name: "home", params: {} });
  });
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap");

.form {
  max-width: 38rem;
  margin: auto;
  background-color: var(--el-bg-color-overlay);
  max-height: max-content;
  min-height: 22rem;
  padding: 2.8rem;
  border-radius: var(--el-border-radius-large);
}

.el-form-item {
  margin-bottom: 2rem;
}

.el-input__inner {
  padding: 1.4rem 0;
}

.form-header {
  font-size: 2.8rem;
  font-weight: 700;
  margin-bottom: 2.4rem;
  margin-top: 2rem;
  color: var(--el-color-primary);
  text-align: center;
  width: 100%;
  font-family: "Ubuntu", sans-serif;
}

.form-submit {
  width: 100%;
}
</style>
