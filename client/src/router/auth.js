import { lazyViews } from "@/utils";

import AuthLayout from "@/layouts/AuthLayout.vue"

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: lazyViews("Auth/LoginView.vue"),
    meta: {
      requireAuth: false,
      title: "Login",
      layout: AuthLayout
    },
  },
  {
    path: "/register",
    name: "register",
    component: lazyViews("Auth/RegisterView.vue"),
    meta: {
      requireAuth: false,
      title: "Register",
      layout: AuthLayout
    },
  },
];
