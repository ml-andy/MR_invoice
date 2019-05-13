import * as routePath from '@/constant/routePath';
import { checkPath } from '@/helpers/unit';

export const beforeEach = (to, from, next) => {
  window.scrollTo(0, 0);

  const { path: fromPath } = from;
  const { path: toPath } = to;

  const allowIntroPath = [
    routePath.ENTRY,
    `${routePath.INTRODUCTION}/1`,
    `${routePath.INTRODUCTION}/2`,
    `${routePath.INTRODUCTION}/3`,
  ];

  switch (toPath) {
    case allowIntroPath[0]:
    case allowIntroPath[1]:
    case allowIntroPath[2]:
    case allowIntroPath[3]: {
      const isAllow = checkPath(fromPath, allowIntroPath);
      if (isAllow) next();
      else next({ path: fromPath });
      break;
    }
    case routePath.PHONECODE_BIND: {
      const notAllowBindPath = [
        routePath.PHONECODE_SUCCESS,
        routePath.INVOICE_LIST,
      ];
      const isAllow = !checkPath(fromPath, notAllowBindPath);
      if (isAllow) next();
      else next({ path: routePath.INVOICE });
      break;
    }
    default:
      next();
      break;
  }
};

export const afterEach = (to, from) => {
  console.log(to, from);
};
