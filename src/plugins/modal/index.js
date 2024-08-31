import { reactive } from "vue";
import Modal from "./Modal.vue";

const _current = reactive({
    name: "",
    resolve: null,
    reject: null,
  }),
  api = {
    // which modal is active
    active() {
      return _current.name;
    },
    // show return a promise
    show(name) {
      _current.name = name;
      return new Promise((resolve = () => {}, reject = () => {}) => {
        _current.resolve = resolve;
        _current.reject = reject;
      });
    },
    // confirm will resolve the promise
    confirm() {
      _current.resolve();
      _current.name = "";
    },
    // cancel will reject the promise
    cancel() {
      _current.reject();
      _current.name = "";
    },
  },
  plugin = {
    install(App, options) {
      // Register global component
      App.component("Modal", Modal);
      // Provide API
      App.provide("$modals", api);
    },
  };

export default plugin;
