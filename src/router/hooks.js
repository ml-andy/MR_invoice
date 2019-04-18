import * as routePath from '@/constant/routePath';

export const beforeEach = (to, from, next) => {
  window.scrollTo(0, 0);

  const { path: fromPath } = from;
  const { path: toPath } = to;

  switch (toPath) {
    case '/': {
      if (fromPath !== '/') {
        window.location.href = routePath.MMO_ENTRY;
      }
      break;
    }
    default:
      break;
  }

  next();
};

export const afterEach = (to, from) => {
  console.log(to, from);
};
