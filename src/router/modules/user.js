import * as routePath from '@/constant/routePath';
import Page from '@/views/Page';
import IntroductionStep1 from '@/views/user/introduction/Step1';
import IntroductionStep2 from '@/views/user/introduction/Step2';
import IntroductionStep3 from '@/views/user/introduction/Step3';
import Agreement from '@/views/user/Agreement';

export default [
  {
    path: routePath.USER,
    name: 'User',
    redirect: routePath.USER_INTRODUCTION,
    component: Page,
    children: [
      {
        path: routePath.USER_INTRODUCTION,
        name: 'User Introduction',
        redirect: routePath.USER_INTRODUCTION_STEP1,
        component: Page,
        children: [
          {
            path: routePath.USER_INTRODUCTION_STEP1,
            name: 'User Introduction step1',
            component: IntroductionStep1,
          },
          {
            path: routePath.USER_INTRODUCTION_STEP2,
            name: 'User Introduction step2',
            component: IntroductionStep2,
          },
          {
            path: routePath.USER_INTRODUCTION_STEP3,
            name: 'User Introduction step3',
            component: IntroductionStep3,
          },
        ],
      },
      {
        path: routePath.USER_AGREEMENT,
        name: 'User Agreement',
        component: Agreement,
      },
    ],
  },
];
