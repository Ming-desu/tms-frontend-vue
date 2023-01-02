<script setup>
import Toast from "primevue/toast";

const icons = {
  success: "las la-check fs-2",
  info: "las la-info-circle fs-2",
  warn: "las la-exclamation-triangle fs-2",
  error: "las la-times-circle fs-2",
};
</script>

<template>
  <Toast>
    <template #message="slotProps">
      <div class="d-flex w-100">
        <i
          :class="$attrs.icon ? $attrs.icon : icons[slotProps.message.severity]"
          v-show="$attrs.hasIcon"
        ></i>
        <div class="flex-fill ms-3">
          <h4 class="m-0 mb-2">{{ slotProps.message.summary }}</h4>
          <p class="m-0">{{ slotProps.message.detail }}</p>
        </div>
      </div>
    </template>
  </Toast>
</template>

<style></style>
