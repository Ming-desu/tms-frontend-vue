<script setup>
import { Suspense, KeepAlive, Transition } from "vue";
import Loading from "@/components/Loading.vue";
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <Transition name="fade" mode="out-in">
        <KeepAlive>
          <Loading>
            <Component :is="Component" />
          </Loading>
        </KeepAlive>
      </Transition>
    </Suspense>
  </RouterView>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap");
@import url("https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css");

:root {
  --font-family: "Roboto", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
    Segoe UI Symbol !important;
}

* {
  font-family: var(--font-family);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
