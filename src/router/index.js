import Vue from 'vue';
import Router from 'vue-router';

import unknown from '@/router/modules/unknown';
import entry from '@/router/modules/entry';
import layout from './modules/layout';
import introduction from './modules/introduction';
import agreement from './modules/agreement';
import phonecode from './modules/phonecode';

Vue.use(Router);

const routes = [
  ...entry,
  ...unknown,
  ...layout,
  ...introduction,
  ...agreement,
  ...phonecode,
];

export default new Router({
  routes,
});
