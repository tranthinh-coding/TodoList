import { defineStore } from "pinia";
import { useFetch } from "@/composables/useFetch";

import {
  LOGIN_API,
  REGISTER_API,
  ACCESS_TOKEN,
  REMEMBER_TOKEN, LOGOUT_API
} from "@/config/app";
import { removeToken, setToken } from "@/utils/auth";

export const useUser = defineStore("user", {
  state: () => ({
    name: "",
    email: "",
    [ACCESS_TOKEN]: "",
    loginStatus: false,
  }),
  actions: {
    async login(form) {
      const { data, error } = await useFetch(LOGIN_API, {
        method: "post",
      }).post(form).json();
      if (!error.value) {
        if(form[REMEMBER_TOKEN]) data.value[REMEMBER_TOKEN] = form[REMEMBER_TOKEN];
        this.saveUser(data.value);
      }
      return { data, error };
    },
    async register(form) {
      const { data, error } = await useFetch(REGISTER_API, {
        method: "post",
      }).post(form).json();
      if (!error.value) {
        this.saveUser(data.value);
      }
      return { data, error };
    },
    async logout() {
      if (this.getLoginStatus(ACCESS_TOKEN)) {
        await useFetch(LOGOUT_API, {
          method: "post",
        }).post().json();
      }
      this.$reset();
      removeToken([ACCESS_TOKEN, REMEMBER_TOKEN]);
    },
    saveUser({ name, email, [ACCESS_TOKEN]: _token, [REMEMBER_TOKEN]: _token2 }) {
      this.name = name;
      this.email = email;
      this[ACCESS_TOKEN] = _token;
      this.loginStatus = true;
      setToken(ACCESS_TOKEN, _token);
      setToken(REMEMBER_TOKEN, _token2);
    },
  },
  getters: {
    userInfo: (state) => state,
    getToken: (state) => (tokenName) => state[tokenName],
    getLoginStatus: (state) => (tokenName) =>
      state.loginStatus && state[tokenName],
  },
});
