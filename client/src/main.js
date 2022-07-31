import { createApp } from "vue";
import App from "@/App.vue";
import "@/registerServiceWorker";
import router from "@/router";
import { createPinia } from "pinia";
/** Element plus: vue element */
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/display.css";
import "element-plus/theme-chalk/dark/css-vars.css";
/** NProgress Load Page */
import "nprogress/nprogress.css";
/** Vue I18n  */
import i18n from "@/plugins/i18n";

/** Css */
import "@/assets/style/index.css";
/** Boxicons */
import "@/assets/style/boxicons-2.1.2/css/boxicons.min.css";
/**
 * Vuesax UI
 */
import Vuesax from "@/plugins/vuesax";

const app = createApp(App);
/** Plugins */
app.use(createPinia());
app.use(ElementPlus);
app.use(router);
app.use(Vuesax);
app.use(i18n);

app.mount("#app");
