import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createPinia } from "pinia";

/**
 * Reset Css
 */
import "@/assets/style/reset.css";

/**
 * Element plus
 */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";

/**
 * NProgress Load Page
 */
import "nprogress/nprogress.css";

/**
 * Vue I18n
 */
import i18n from "@/config/i18n";

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(i18n);
app.use(createPinia());
app.mount("#app");
