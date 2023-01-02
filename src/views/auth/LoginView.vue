<script setup>
import InputText from "@/components/reusables/InputText.vue";
import Message from "@/components/reusables/Message.vue";
import Button from "primevue/button";
import Card from "primevue/card";

import { ref } from "vue";
import { useRouter, useRoute, RouterLink } from "vue-router";

import { useAuthStore } from "../../stores/auth";

const route = useRoute();
const router = useRouter();

const username = ref("");
const password = ref("");

const handleSubmit = async (event) => {
  const auth = useAuthStore();
  const { hasError } = await auth.login(username.value, password.value);

  if (!hasError) {
    router.push({
      path: route.query.redirect || "/",
    });
  }
};
</script>

<template>
  <main>
    <section class="d-flex">
      <Card class="col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3 mx-auto">
        <template #header>
          <img
            class="img-fluid mx-auto d-block pt-3"
            src="@/assets/svg/tms-logo-banner.svg"
            alt="TMS Logo"
            style="max-width: 75%"
          />
        </template>
        <template #title>Sign in your account.</template>
        <template #subtitle>Welcome, we are happy to see you again.</template>
        <template #content>
          <Message type="error" :has-message-icon="true" />
          <form method="POST" @submit.prevent="(event) => handleSubmit(event)">
            <InputText
              label="Email or username"
              id="username"
              name="username"
              type="text"
              placeholder="email@domain.com"
              left-icon="las la-user"
              v-model="username"
            />
            <InputText
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              left-icon="las la-lock"
              v-model="password"
            />
            <div class="d-flex align-items-center justify-content-between">
              <RouterLink class="me-2" to="/forgot-password">
                Forgot password?
              </RouterLink>
              <Button type="submit">Log in</Button>
            </div>
          </form>
        </template>
      </Card>
    </section>
    <p class="text-center">
      Don&apos;t have an account? Register
      <RouterLink to="/register">here</RouterLink>.
    </p>
  </main>
</template>

<style lang="scss" scoped>
.p-card {
  margin: 4rem 0 2rem 0;
}
</style>
