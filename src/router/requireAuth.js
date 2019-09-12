// import * as routePath from '@/constant/routePath';
// import store from '@/store';
// import { checkPath } from '@/helpers/unit';

// const invoicePath = [
//   routePath.INVOICE_LIST,
//   routePath.INVOICE_DETAIL,
// ];

// const handleNotFullySignup = (to, from, next) => {
//   const { path: fromPath } = from;
//   const { path: toPath } = to;

//   if (fromPath === routePath.PHONECODE_BIND && toPath !== routePath.PHONECODE_SUCCESS) {
//     next(false);
//   } else if (
//     fromPath === routePath.PHONECODE_UPDATESUCCESS && toPath === routePath.PHONECODE_UPDATE
//   ) {
//     next({ path: routePath.PHONECODE_BIND });
//   } else {
//     next();
//   }
// };

// const handleFullySignup = (to, from, next) => {
//   const { path: fromPath } = from;
//   const { path: toPath } = to;

//   if (toPath === routePath.PHONECODE_UPDATESUCCESS) {
//     const isFromInvoice = checkPath(fromPath, invoicePath);
//     if (isFromInvoice) {
//       next(false);
//     } else {
//       next();
//     }
//   } else if (toPath === routePath.PHONECODE_SUCCESS) {
//     next();
//   } else if (toPath === routePath.PHONECODE_BIND && fromPath === routePath.PHONECODE_SUCCESS) {
//     next({ path: routePath.INVOICE_LIST });
//   } else if (fromPath === routePath.PHONECODE_UPDATESUCCESS) {
//     next({ path: routePath.INVOICE_LIST });
//   } else {
//     next(false);
//   }
// };

export default (to, from, next) => {
  next();
  // const { included = null, isBound = false } = store.state.phonecode || {};
  // const isFullySignup = included && isBound;

  // if (!isFullySignup) {
  //   handleNotFullySignup(to, from, next);
  // } else {
  //   handleFullySignup(to, from, next);
  // }
};
