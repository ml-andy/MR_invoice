import * as routePath from '@/constant/routePath';
import requireAuth from '@/router/requireAuth';
import Page from '@/views/Page';
import IntroductionIndex from '@/views/introduction/Index';

export default [
  {
    path: routePath.ENTRY,
    name: 'Introduction',
    redirect: `${routePath.INTRODUCTION}/1`,
    component: Page,
    children: [
      {
        path: routePath.INTRODUCTION_STEP,
        name: 'Introduction step',
        component: IntroductionIndex,
        beforeEnter: requireAuth,
      },
    ],
  },
];
