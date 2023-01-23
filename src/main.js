import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

import "bootstrap";

import routes from "./router";
import VueCookies from "vue-cookies";
import VueResource from "vue-resource";

Vue.use(VueResource);

// default options config: { expires: '1d', path: '/', domain: '', secure: '', sameSite: 'Lax' }
Vue.use(VueCookies, { expires: "7d" });
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
