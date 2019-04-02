import Vue from 'vue';
import Router from 'vue-router';

import unknown from '@/router/modules/unknown';
import entry from '@/router/modules/entry';
import layout from './modules/layout';
import user from './modules/user';

Vue.use(Router);

const routes = [
  ...entry,
  ...unknown,
  ...layout,
  ...user,
];

export default new Router({
  routes,
});
