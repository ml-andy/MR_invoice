// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueHead from 'vue-head';
import './style/main.scss';
import App from './App';
import router from './router';
import store from './store';

Vue.use(VueHead);
require('es6-promise').polyfill();
require('babel-polyfill');

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
