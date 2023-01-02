<script setup>
import { defineProps } from "vue";

defineProps({
  isFlex: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div :class="isFlex ? 'd-flex' : 'row'">
    <slot></slot>
  </div>
</template>
