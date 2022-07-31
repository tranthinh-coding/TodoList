import { createRouter, createWebHistory } from "vue-router";
import { lazyViews } from "@/utils";
import { useUser } from "@/store/useUser";
import { ACCESS_TOKEN, REMEMBER_TOKEN } from "@/config/app";
import { authRoutes } from "@/router/auth";
import { getToken, removeToken } from "@/utils/auth";

import DashboardLayout from "@/layouts/DashboardLayout.vue";

const routes = [
  {
    path     : "/",
    name     : "home",
    component: lazyViews("HomeView.vue"),
    meta     : {
      requireAuth: true,
      title      : "Home",
      layout     : DashboardLayout
    }
  },
  {
    path     : "/about",
    name     : "about",
    component: lazyViews("AboutView.vue"),
    meta     : {
      requireAuth: true,
      title      : "About",
      layout     : DashboardLayout
    }
  },
  ...authRoutes
];

export const routerAuthUser     = ["login", "register"];
export const routerExceptedAuth = [...routerAuthUser];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior (to, _, savedPosition) {
    let scrollTo = 0;
    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    return { y: scrollTo, behavior: "smooth" };
  }
});

router.beforeEach(async (to, _, next) => {
  if (to.name === "logout") return next();
  const user = useUser();
  if ( ! user.getLoginStatus(ACCESS_TOKEN)) {
    // user was not logged in
    const hasRememberToken = getToken(REMEMBER_TOKEN);
    if (hasRememberToken) {
      const { error } = await user.login({
        [REMEMBER_TOKEN]: hasRememberToken,
        device_name     : ACCESS_TOKEN
      });
      if ( ! error.value) {
        if ( ! routerAuthUser.includes(to.name)) return next();
        return next({ name: "home" });
      }
      removeToken([REMEMBER_TOKEN, ACCESS_TOKEN]);
    }
    if ( ! to.meta.requireAuth || routerExceptedAuth.includes(to.name)) return next();
    return next({ name: "login" });
  }
  if (routerAuthUser.includes(to.name)) return next({ name: "home" });
  return next();
});

export default router;
