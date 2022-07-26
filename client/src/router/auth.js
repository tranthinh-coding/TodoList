import { lazyViews } from "@/utils";

export const authRoutes = [
  {
    path: "/login",
    name: "login",
    component: lazyViews("Auth/LoginView.vue"),
    meta: {
      requireAuth: false,
      title: "Login",
    },
  },
  {
    path: "/register",
    name: "register",
    component: lazyViews("Auth/RegisterView.vue"),
    meta: {
      requireAuth: false,
      title: "Register",
    },
  },
];
