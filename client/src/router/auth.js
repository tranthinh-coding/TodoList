import { useUser } from "@/store/useUser";
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
      layout: AuthLayout,
    },
  },
  {
    path: "/register",
    name: "register",
    component: lazyViews("Auth/RegisterView.vue"),
    meta: {
      requireAuth: false,
      title: "Register",
      layout: AuthLayout,
    },
  },
  {
    path: "/logout",
    name: "logout",
    async beforeEnter() {
      const user = useUser();
      await user.logout();
      return { name: 'login' };
    },
    meta: {
      requireAuth: true,
    },
  },
];
