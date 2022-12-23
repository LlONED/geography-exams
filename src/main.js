import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";
import "@/assets/tailwind.css";

const componentsUI = require.context("@/components/UI", false, /\.vue$/i);

const app = createApp(App);

componentsUI.keys().forEach((key) => {
  app.component(componentsUI(key).default.name, componentsUI(key).default);
});

app.use(router).use(store).mount("#app");
