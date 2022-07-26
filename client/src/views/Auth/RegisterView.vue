<template>
  <el-form
    ref="formRef"
    status-icon
    scroll-to-error
    :model="form"
    :rules="formRules"
    class="form"
    label-position="right"
    label-width="200px"
    @submit="submit"
  >
    <el-form-item label="Your name" prop="name" :error="formErrors.name">
      <el-input
        v-model="form.name"
        label="name"
        placeholder="Full name"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="Your email" prop="email" :error="formErrors.email">
      <el-input
        v-model="form.email"
        label="email"
        placeholder="Email"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password" :error="formErrors.password">
      <el-input
        type="password"
        v-model="form.password"
        label="password"
        placeholder="password"
        clearable
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item
      label="Confirm password"
      prop="password_confirmation"
      :error="formErrors.password_confirmation"
    >
      <el-input
        type="password"
        v-model="form.password_confirmation"
        label="password"
        placeholder="password"
        clearable
        show-password
      >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button :disabled="isFetching" text bg type="primary" size="large" @click="submit(formRef)"
        >Register</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUser } from "@/store/useUser";
// import { useNProgress } from "@vueuse/integrations/useNProgress";
// import { ElNotification } from "element-plus";
import { useFetch } from "@/composables/useFetch";
import { REGISTER_API, TokenKey } from "@/config/app";

const user = useUser();
const formRef = ref();
const form = reactive({
  name: "think",
  email: "tranthinh.own@gmail.com",
  password: "123123123",
  password_confirmation: "123123123",
  device_name: TokenKey,
});
const formErrors = ref(initFormErrors());
const { data, error, isFetching, execute } = useFetch(REGISTER_API, {
  method: "post",
  immediate: false,
})
  .post(form)
  .json();

const formRules = {
  name: [
    {
      required: true,
      message: "This field must be require",
      trigger: "blur",
    },
  ],
  email: [
    {
      required: true,
      message: "This field must be require",
      trigger: "blur",
    },
    {
      type: "email",
      message: "Please input correct email address",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "This field must be require",
      trigger: "blur",
    },
  ],
  password_confirmation: [
    {
      required: true,
      message: "This field must be require",
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
    callback("Two inputs don't match!");
  } else {
    callback();
  }
}

async function submit(formRef) {
  if (!formRef) return;
  formRef.validate(async (valid) => {
    if (!valid) return;
    formErrors.value = initFormErrors();
    await execute();
    if (error.value) {
      return (formErrors.value = { ...error.value });
    }

    console.log(data);
    user.saveUser({ ...form, loginStatus: true, token: data.value[TokenKey] });
  });
}
</script>

<style scoped>
.form {
  max-width: 500px;
  margin: auto;
}

</style>
