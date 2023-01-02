import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";

import Button from "primevue/button";
import Toast from "@/components/reusables/Toast.vue";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "@/assets/css/bootstrap-grid.min.css";
// import "@/assets/css/bootstrap-grid.min.css.map";
import "@/assets/css/bootstrap-utilities.min.css";
// import "@/assets/css/bootstrap-utilities.min.css.map";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

// eslint-disable-next-line vue/multi-word-component-names
app.component("Button", Button);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toast", Toast);

app.mount("#app");
