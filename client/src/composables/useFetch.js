import { createFetch } from "@vueuse/core";
import { isLogged } from "@/utils/auth";

import { useUser } from "@/store/useUser";

import { start, done } from "nprogress";
done();

export const useFetch = createFetch({
  baseUrl: process.env.VUE_APP_API_V1,
  options: {
    async beforeFetch({ options }) {
      start();
      options.headers.Accept = "application/json;charset=utf-8";
      options.headers["X-Requested-With"] = "XMLHttpRequest";
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${useUser().getLoginStatus() || isLogged()}`,
      };
      return { options };
    },
    afterFetch(ctx) {
      done();
      return ctx;
    },
    onFetchError(ctx) {
      const errorMessages = ctx.data?.errors || ctx.data?.message || 'Something went wrong, please check your action';
      if (typeof errorMessages === "object") {
        ctx.error = Object.keys(errorMessages).reduce((target, currentKey) => {
          return { ...target, [currentKey]: errorMessages[currentKey][0] };
        }, {});
      } else ctx.error = errorMessages;

      done();
      return ctx;
    },
    timeout: 10000,
  },

  fetchOptions: {
    mode: "cors",
  },
});
