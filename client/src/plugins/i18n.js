import { createI18n } from "vue-i18n";
import { viVN, enUS } from "@/lang";

export function setupI18n(options) {
  const i18n = createI18n(options);
  document.querySelector("html").setAttribute("lang", options.locale);
  return i18n;
}

export default setupI18n({
  legacy: false,
  locale: "enUS",
  fallbackLocale: "enUS",
  messages: {
    viVN,
    enUS,
  },
});
