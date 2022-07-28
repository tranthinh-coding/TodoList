import { createRouter, createWebHistory } from "vue-router";
import { lazyViews } from "@/utils";
import { useUser } from "@/store/useUser";
import { ACCESS_TOKEN, REMEMBER_TOKEN } from "@/config/app";
import { authRoutes } from "@/router/auth";
import { getToken } from "@/utils/auth";

import DashboardLayout from "@/layouts/DashboardLayout.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: lazyViews('HomeView.vue'),
    meta: {
      requireAuth: true,
      title: "Home",
      layout: DashboardLayout
    },
  },
  {
    path: "/about",
    name: "about",
    component: lazyViews("AboutView.vue"),
    meta: {
      requireAuth: true,
      title: "About",
      layout: DashboardLayout
    },
  },
  ...authRoutes,
];

export const routerExceptedAuth = ["login", "register"];
export const routerAuthUser = [...routerExceptedAuth];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    if (to.hash) {
      return to.hash;
    }

    return { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  const user = useUser();
  // user not logged in
  if (!user.getLoginStatus(ACCESS_TOKEN)) {
    // check user has remember me token
    const hasRememberToken = getToken(REMEMBER_TOKEN);
    if (hasRememberToken !== "undefined") {
      user.login({
        [REMEMBER_TOKEN]: hasRememberToken,
        device_name: ACCESS_TOKEN,
      });
      console.log("Logged with remember token");
      return next();
    }
    // not has remember token: check to.route required Auth? or this route was excepted auth
    if (!to.meta.requireAuth || routerExceptedAuth.includes(to.name)) {
      return next();
    }
    // to.route required Auth => redirect login view
    return next({ name: "login" });
  }
  // was logged in.
  return next();
});

export default router;
