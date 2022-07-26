import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { lazyViews } from "@/utils";

import { authRoutes } from "./auth";

const routes = [
  ...authRoutes,
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "aboue",
    component: lazyViews('views/AboutView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    if (to.hash) {
      return to.hash;
    }

    return { top: 0 };
  },
});

export default router;
