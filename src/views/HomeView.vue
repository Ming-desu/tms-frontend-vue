<script setup>
import Button from "primevue/button";

import { useRouter } from "vue-router";

import { useAuthStore } from "../stores/auth";

const router = useRouter();

const handleLogoutButton = (event) => {
  const authStore = useAuthStore();
  authStore.logout();

  router.push({
    name: "Login",
  });
};
</script>

<template>
  <h1>Home</h1>
  <Button type="button" @click="(event) => handleLogoutButton(event)"
    >Logout</Button
  >
</template>

<style></style>
