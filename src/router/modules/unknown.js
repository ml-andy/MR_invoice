import * as routePath from '@/constant/routePath';

export default [
  {
    path: '*',
    name: 'unknown path',
    redirect: routePath.ENTRY,
  },
];
