import { createI18n } from "vue-i18n";
import { viVN, enUS } from "@/lang";

export default createI18n({
  legacy: false,
  locale: "viVN",
  fallbackLocale: "viVN",
  messages: {
    viVN,
    enUS,
  },
});
