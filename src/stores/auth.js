import { defineStore } from "pinia";

import { useGlobalStore } from "./global";
import { useAuth } from "../composables/auth";

import axios from "../utils/axios";

const { saveCredentials, removeCredentials } = useAuth();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => state.authenticated,
    getUser: (state) => state.user,
  },
  actions: {
    async login(email, password) {
      const global = useGlobalStore();

      try {
        global.setLoading(true);
        const {
          data: {
            data: { profile, ...rest },
            message,
          },
        } = await axios.post("/api/auth/login", {
          email,
          password,
        });

        this.authenticated = true;
        this.user = profile;
        this.token = rest;

        saveCredentials(profile, rest);

        global.setLoading(false);

        return {
          hasError: false,
          message,
        };
      } catch (err) {
        if (err.response) {
          global.setError({
            ...err.response.data,
          });
        } else {
          global.setError({
            message: err.message,
          });
        }

        global.setLoading(false);

        return {
          hasError: true,
          error: global.getError,
        };
      }
    },
    async logout() {
      const global = useGlobalStore();

      global.setLoading(true);

      this.authenticated = false;
      this.user = null;
      this.token = null;

      removeCredentials();

      global.setLoading(false);
    },
    setAuthenticated(value) {
      this.authenticated = value;
    },
    setUser(value) {
      this.user = value;
    },
    setToken(value) {
      this.token = value;
    },
  },
});
