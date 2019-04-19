import * as routePath from '@/constant/routePath';
import router from '@/router';

export const FETCH_ERROR = {
  commit: 'error/EDIT_ERROR',
  message: '系統忙碌中，請您稍後再試(MO001)',
};

export const NETWORK_ERROR = {
  commit: 'error/EDIT_ERROR',
  message: '系統忙碌中，請您稍後再試(MO003)',
  customEvent: () => {
    location.href = routePath.MMO_ENTRY;
  },
};

export const SOURCE_ERROR = {
  commit: 'error/EDIT_ERROR',
  message: '請使用國泰優惠開啟(MO004)',
  customEvent: () => {
    location.href = routePath.MMO_ENTRY;
  },
};

export const PASSWORD_ERROR = {
  errorCode: 'ES_F_919_ERROR',
  commit: 'error/EDIT_ERROR',
  message: '發票更新失敗',
  txt: '您的手機條碼驗證碼可能有變更，以致更新失敗，請更新您的驗證碼',
  buttonTxt: '馬上更新',
  customEvent: () => {
    router.push(routePath.PHONECODE_UPDATE);
  },
};
