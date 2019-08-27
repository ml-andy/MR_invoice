import * as routePath from '@/constant/routePath';
import requireAuth from '@/router/requireAuth';
import Agreement from '@/views/Agreement';

export default [
  {
    path: routePath.AGREEMENT,
    name: 'agreement',
    component: Agreement,
    beforeEnter: requireAuth,
  },
];
