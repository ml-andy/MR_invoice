// import * as routePath from '@/constant/routePath';
// import { checkPath } from '@/helpers/unit';

export const beforeEach = (to, from, next) => {
  window.scrollTo(0, 0);
  next();

  // const { path: fromPath } = from;
  // const { path: toPath } = to;

  // switch (toPath) {
  //   case routePath.PHONECODE_BIND: {
  //     const notAllowBindPath = [
  //       routePath.PHONECODE_SUCCESS,
  //     ];
  //     const isAllow = !checkPath(fromPath, notAllowBindPath);
  //     if (isAllow) next();
  //     else next({ path: routePath.INVOICE });
  //     break;
  //   }
  //   default:
  //     next();
  //     break;
  // }
};

export const afterEach = (to, from) => {
  console.log(to, from);
};
