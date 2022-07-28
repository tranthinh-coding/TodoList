import { defineStore } from "pinia";
import { useFetch } from "@/composables/useFetch";

import {
  LOGIN_API,
  REGISTER_API,
  ACCESS_TOKEN,
  REMEMBER_TOKEN,
} from "@/config/app";
import { removeToken, setToken } from "@/utils/auth";
import { ElMessage } from "element-plus";
import i18n from "@/config/i18n";

export const useUser = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    [ACCESS_TOKEN]: "",
    loginStatus: false,
  }),
  actions: {
    async login(form) {
      const { data, error, isFetching } = await useFetch(LOGIN_API, {
        method: "post",
      })
        .post(form)
        .json();

      if (error.value) {
        typeof error.value == "string" &&
          ElMessage({
            message: error.value,
            type: "error",
            duration: 5 * 1000,
            showClose: true,
          });
      } else {
        ElMessage({
          message: i18n.global.t("auth.loginSuccess"),
          type: "success",
          duration: 5 * 1000,
          showClose: true,
        });

        console.log(data.value);
        this.saveUser(data.value);
        setToken(ACCESS_TOKEN, this[ACCESS_TOKEN]);
        setToken(REMEMBER_TOKEN, data.value[REMEMBER_TOKEN]);
      }
      return { data, error, isFetching };
    },
    async register(form) {
      const { data, error, isFetching } = await useFetch(REGISTER_API, {
        method: "post",
      })
        .post(form)
        .json();

      if (error.value) {
        typeof error.value == "string" &&
          ElMessage({
            message: error.value,
            type: "error",
            duration: 5 * 1000,
            showClose: true,
          });
      } else {
        ElMessage({
          message: i18n.global.t("auth.registerSuccess"),
          type: "success",
          duration: 5 * 1000,
          showClose: true,
        });
        this.saveUser(data.value);
        setToken(ACCESS_TOKEN, this[ACCESS_TOKEN]);
      }
      return { data, error, isFetching };
    },
    logout() {
      this.$reset();
      return removeToken([ACCESS_TOKEN, REMEMBER_TOKEN]);
    },
    saveUser({ name, email, [ACCESS_TOKEN]: token }) {
      this.name = name;
      this.email = email;
      this[ACCESS_TOKEN] = token;
      this.loginStatus = true;
    },
  },
  getters: {
    userInfo: (state) => state,
    getToken: (state) => (tokenName) => state[tokenName],
    getLoginStatus: (state) => (tokenName) =>
      state.loginStatus && state[tokenName],
  },
});
