import { createRouter, createWebHistory } from "vue-router";

import { useAuthStore } from "../stores/auth";
import { useAuth } from "../composables/auth";

import PageNotFound from "../views/404/PageNotFound.vue";

import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...privateRoutes,
    ...publicRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: PageNotFound,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const { getSaveCredentials } = useAuth();

  // Await the retrieval of saved credentials
  await getSaveCredentials();

  const auth = useAuthStore();

  if (auth.isAuthenticated && to.name !== "Home") {
    return {
      path: "/",
    };
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return {
      path: "/login",
      query: {
        redirect: to.fullPath,
      },
    };
  }
});

export default router;
