import { defineStore } from "pinia";

export const useTask = defineStore("task", {
  state: () => ({
    id: "",
    name: "",
    status: "",
    label_name: "",
    label_color: "",
    expiration_date: "",
    updated_at: "",
    created_at: "",
  }),
  actions: {},
  getters: {},
});
