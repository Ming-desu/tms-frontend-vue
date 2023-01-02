<script setup>
import InputText from "@/components/reusables/InputText.vue";
import Message from "@/components/reusables/Message.vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

import { useForgotPassword } from "@/composables/forgotPassword";

const router = useRouter();

const username = ref("");
const checkInboxVisibility = ref(false);

const handleSubmit = async (event) => {
  const { forgotPassword } = useForgotPassword();
  const { hasError } = await forgotPassword(username.value);

  if (!hasError) {
    checkInboxVisibility.value = true;
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
        <template #title>Find your account.</template>
        <template #subtitle
          >Please provide your email to search for your account.</template
        >
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
            <div class="text-end">
              <RouterLink
                class="p-button p-component p-button-text p-button-plain me-2"
                to="/login"
              >
                Cancel
              </RouterLink>
              <Button type="submit">Search</Button>
            </div>
          </form>
        </template>
      </Card>
    </section>
    <Dialog
      header="Check your inbox"
      position="top"
      :closable="false"
      :model="true"
      aria-close-label="las la-times fs-2"
      v-model:visible="checkInboxVisibility"
    >
      We already sent an email to your account. Please check your account, if
      you don&apos;t see it in your main inbox. Try checking it in the spam
      emails.
      <template #footer>
        <Button
          type="button"
          class="p-button-text"
          @click="() => (checkInboxVisibility = false)"
          >Got it</Button
        >
      </template>
    </Dialog>
  </main>
</template>

<style lang="scss" scoped>
.p-card {
  margin: 4rem 0 2rem 0;
}
</style>
