import * as routePath from '@/constant/routePath';
import Page from '@/views/Page';
import Phonecode from '@/views/phonecode/Index';
import PhonecodeSignin from '@/views/phonecode/Signin';
import PhonecodeSignup from '@/views/phonecode/Signup';
import PhonecodeConfirm from '@/views/phonecode/Confirm';

export default [
  {
    path: routePath.PHONECODE,
    name: 'phonecode',
    component: Page,
    children: [
      {
        path: routePath.PHONECODE,
        name: 'phonecode index',
        component: Phonecode,
      },
      {
        path: routePath.PHONECODE_SIGNIN,
        name: 'phonecode signin',
        component: PhonecodeSignin,
      },
      {
        path: routePath.PHONECODE_SIGNUP,
        name: 'phonecode signup',
        component: PhonecodeSignup,
      },
      {
        path: routePath.PHONECODE_CONFIRM,
        name: 'phonecode confirm',
        component: PhonecodeConfirm,
      },
    ],
  },
];
