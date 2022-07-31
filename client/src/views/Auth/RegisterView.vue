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
      <h1 class="form-header">{{ t("pages.getStarted") }}</h1>
    </el-form-item>
    <el-form-item prop="name" :error="formErrors.name">
      <el-input
        v-model="form.name"
        label="name"
        icon=""
        :placeholder="t('form.name')"
        clearable
      ></el-input>
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
    <el-form-item
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
        type="primary"
        class="form-submit"
        :disabled="isFetching"
        @click.prevent="submit(formRef)"
      >
        {{ t("auth.register") }}
      </el-button>
    </el-form-item>
    <el-form-item size="large">
      <span>
        {{ t("auth.haveAnAccount") }}
        <el-link type="primary">
          <router-link :to="{ name: 'login' }">{{ t("auth.login") }}</router-link>
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
import { ACCESS_TOKEN, REGISTER_API } from "@/config/app";
import { ElMessage } from "element-plus";
import { useFetch } from "@/composables/useFetch";

const { t }            = useI18n();
const router           = useRouter();
const user             = useUser();
const formRef          = ref();
const form             = reactive({
  name                 : "think",
  email                : "tranthinh.own@gmail.com",
  password             : "123123123",
  password_confirmation: "123123123",
  device_name          : ACCESS_TOKEN
});
const isFetching       = ref(false);
const formErrors       = ref(initFormErrors());
const formRules        = {
  name                 : [
    {
      required: true,
      message : t("validate.required"),
      trigger : "blur"
    }
  ],
  email                : [
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
  password             : [
    {
      required: true,
      message : t("validate.required"),
      trigger : "blur"
    }
  ],
  password_confirmation: [
    {
      required: true,
      message : t("validate.required"),
      trigger : "blur"
    },
    {
      validator: formRule_validatePass2,
      trigger  : "blur"
    }
  ]
};

const { data, error, execute: fetchExecute } = useFetch(REGISTER_API, {
  method   : "post",
  immediate: false
}).post(form).json();

function initFormErrors () {
  return {
    name                 : "",
    email                : "",
    password             : "",
    password_confirmation: ""
  };
}
function formRule_validatePass2 (_, value, callback) {
  if (value === form.password) {
    return callback();
  }
  return callback(t("validate.confirmation", [t("validate.password")])); // validate confirm i18n: {params} .... confirm.
}
function submit (formRef) {
  if (!formRef) return;
  formRef.validate(async (valid) => {
    if ( !valid) return;
    isFetching.value = true;
    formErrors.value = initFormErrors();
    await fetchExecute();
    isFetching.value = false
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
      duration : 500,
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
