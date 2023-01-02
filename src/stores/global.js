import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    loading: false,
    error: {},
  }),
  getters: {
    isLoading: (state) => state.loading,
    hasError: (state) => (state.error.message ? true : false),
    getError: (state) => state.error || null,
  },
  actions: {
    setLoading(value) {
      this.loading = value;
    },
    setError(value) {
      this.error = value;
    },
  },
});
