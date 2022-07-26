import { defineStore } from "pinia";
// import request from "@/utils/request";
import { useFetch } from "@/composables/useFetch";

import { TokenKey } from "@/config/app";
import { removeToken } from "@/utils/auth";

export const useUser = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    [TokenKey]: "",
    loginStatus: false,
  }),
  actions: {
    logout() {
      return removeToken();
    },
    saveUser({ name, email, [TokenKey]: token, loginStatus }) {
      this.name = name;
      this.email = email;
      this[TokenKey] = token;
      this.loginStatus = loginStatus;
    },
  },
  getters: {
    userInfo: (state) => state,
    getToken: (state) => (tokenName) => state[tokenName],
    getLoginStatus: (state) => (tokenName) =>
      state.loginStatus && state[tokenName],
  },
});
