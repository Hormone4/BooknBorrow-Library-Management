  // The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AppHeader from './components/Header.vue';
import AppFooter from './components/Footer.vue';

Vue.config.productionTip = false
Vue.component('AppHeader', AppHeader);
Vue.component('AppFooter', AppFooter);

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app');
