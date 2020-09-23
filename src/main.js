import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import store from "./store";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.config.productionTip = false;
Vue.use(Vuetify)

new Vue({
  store,
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount("#app");
