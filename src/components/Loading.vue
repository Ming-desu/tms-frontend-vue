<script setup>
import { Transition } from "vue";

import { useGlobalStore } from "../stores/global";

const global = useGlobalStore();
</script>

<template>
  <div class="loading">
    <slot></slot>

    <Transition name="fade" mode="out-in">
      <div class="loading-splash" v-show="global.isLoading">
        <i class="las la-spinner la-spin fs-1"></i>
      </div>
    </Transition>

    <Toast :hasIcon="true" />
  </div>
</template>

<style scoped>
.loading {
  position: relative;
}

.loading-splash {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(1px);
}
</style>
