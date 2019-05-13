import Vue from 'vue';
import Router from 'vue-router';
import { beforeEach } from '@/router/hooks';

import unknown from '@/router/modules/unknown';
import layout from '@/router/modules/layout';
import introduction from '@/router/modules/introduction';
import agreement from '@/router/modules/agreement';
import phonecode from '@/router/modules/phonecode';
import invoice from '@/router/modules/invoice';

Vue.use(Router);

const routes = [
  ...unknown,
  ...layout,
  ...introduction,
  ...agreement,
  ...phonecode,
  ...invoice,
];

const VueRouter = new Router({ routes });

VueRouter.beforeEach(beforeEach);
export default VueRouter;
