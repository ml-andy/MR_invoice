import * as routePath from '@/constant/routePath';
import Page from '@/views/Page';
import IntroductionStep1 from '@/views/introduction/Step1';
import IntroductionStep2 from '@/views/introduction/Step2';
import IntroductionStep3 from '@/views/introduction/Step3';

export default [
  {
    path: routePath.INTRODUCTION,
    name: 'Introduction',
    redirect: routePath.INTRODUCTION_STEP1,
    component: Page,
    children: [
      {
        path: routePath.INTRODUCTION_STEP1,
        name: 'Introduction step1',
        component: IntroductionStep1,
      },
      {
        path: routePath.INTRODUCTION_STEP2,
        name: 'Introduction step2',
        component: IntroductionStep2,
      },
      {
        path: routePath.INTRODUCTION_STEP3,
        name: 'Introduction step3',
        component: IntroductionStep3,
      },
    ],
  },
];
