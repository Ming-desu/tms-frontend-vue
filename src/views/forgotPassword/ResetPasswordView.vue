<script setup>
import InputText from "@/components/reusables/InputText.vue";
import Message from "@/components/reusables/Message.vue";
import Card from "primevue/card";
import Button from "primevue/button";

import { ref } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { useToast } from "primevue/usetoast";

import { useForgotPassword } from "@/composables/forgotPassword";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const password = ref("");

const handleSubmit = async (event) => {
  const { resetPassword } = useForgotPassword();
  const { hasError } = await resetPassword(password.value, route.params.uuid);

  if (!hasError) {
    toast.add({
      severity: "success",
      summary: "Notification",
      detail: "Successfully reset password.",
      life: 5000,
      closable: false,
    });

    router.push({
      name: "Login",
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
        <template #title>Reset your password.</template>
        <template #subtitle>Please provide a new secure password.</template>
        <template #content>
          <Message type="error" :has-message-icon="true" />
          <form method="POST" @submit.prevent="(event) => handleSubmit(event)">
            <InputText
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              left-icon="las la-lock"
              v-model="password"
            />
            <div class="text-end">
              <RouterLink
                class="p-button p-component p-button-text p-button-plain me-2"
                to="/login"
              >
                Cancel
              </RouterLink>
              <Button type="submit">Reset</Button>
            </div>
          </form>
        </template>
      </Card>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.p-card {
  margin: 4rem 0 2rem 0;
}
</style>
