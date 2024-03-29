import * as routePath from '@/constant/routePath';
import requireAuth from '@/router/requireAuth';
import Page from '@/views/Page';
import Phonecode from '@/views/phonecode/Index';
import PhonecodeSignin from '@/views/phonecode/Signin';
import PhonecodePassword from '@/views/phonecode/Password';
import PhonecodeUpdate from '@/views/phonecode/Update';
import PhonecodeUpdateSuccess from '@/views/phonecode/UpdateSuccess';
import PhonecodeBind from '@/views/phonecode/Bind';
import PhonecodeSuccess from '@/views/phonecode/Success';
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
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_SIGNIN,
        name: 'phonecode signin',
        component: PhonecodeSignin,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_PWD,
        name: 'phonecode password',
        component: PhonecodePassword,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_UPDATE,
        name: 'phonecode update',
        component: PhonecodeUpdate,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_UPDATESUCCESS,
        name: 'phonecode update success',
        component: PhonecodeUpdateSuccess,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_BIND,
        name: 'phonecode bind',
        component: PhonecodeBind,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_SUCCESS,
        name: 'phonecode success',
        component: PhonecodeSuccess,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_SIGNUP,
        name: 'phonecode signup',
        component: PhonecodeSignup,
        beforeEnter: requireAuth,
      },
      {
        path: routePath.PHONECODE_CONFIRM,
        name: 'phonecode confirm',
        component: PhonecodeConfirm,
        beforeEnter: requireAuth,
      },
    ],
  },
];
