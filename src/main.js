import { createApp } from "vue";
import "./style.css";
import "@picocss/pico/css/pico.min.css";
import "@picocss/pico/css/pico.colors.min.css";

import App from "./App.vue";
import Modal from "./plugins/modal";

createApp(App).use(Modal).mount("#app");
