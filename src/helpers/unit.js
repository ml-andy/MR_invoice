import Cookies from 'js-cookie';
import parser from 'ua-parser-js';
/**
 * @desc 串接所有函數
 * @param {firstFn} function - 函數
 * @param {...moreFn} function - 所有非第一個的函數
 * @return {function} - 一個串起所有函數的函數
 */
export const pipe = (firstFn, ...moreFn) => moreFn
  .reduce((acc, curr) => (...arg) => curr(acc(...arg)), firstFn);

/**
 * @desc 函數咖哩化(客製化函數)
 * @param {fn} function - 欲客製化的函數
 * @param {...args} argument - 欲客製化函數的 argument
 * @return {function} - 一個將被定義過的 argument 置入後的函數
 */
export const curry = (fn) => {
  const nest = (N, args) => (
    (...xs) => {
      if (N - xs.length <= 0) return fn(...args, ...xs);
      return nest(N - xs.length, [...args, ...xs]);
    }
  );
  return nest(fn.length, []);
};

/**
 * @desc 解析網址中帶的參數
 * @param {url} string - 網址
 * @return {object} - key:value,如果沒有返回：{}
 */
export function parseQueryString(url) {
  const subStart = url.indexOf('?') + 1;
  if (subStart > 0) {
    const paraString = url.substring(subStart, url.length).split('&');
    return paraString.reduce((accumlator, currentValue) => {
      const keyvalue = currentValue.split('=');
      return {
        ...accumlator,
        [keyvalue[0]]: keyvalue[1],
      };
    }, {});
  }
  return {};
}

/**
 * @desc 清掉網址中帶的參數
 */
export function clearUrlParse() {
  history.pushState(null, '', location.href.split('?')[0]);
}

/**
 * @desc 塞入 cookies
 * @param {key} string - 預定放入 cookies 的名稱
 * @param {value} string - 放入 cookies 的值
 */
export function setCookie(key, value) {
  Cookies.set(key, value);
}

/**
 * @desc 以 json 格式取得 cookies
 * @param {key} string - 取得 cookies 的名稱
 * @return {object} - json 格式返回對應 key 的 cookies，
 */
export function getCookie(key) {
  return Cookies.getJSON(key);
}


/**
 * @desc 取得 user angent 相關資訊並解析是否有MR tag
 * @return {object} -  返回資訊
 */
export function getUA() {
  const regex = /(MyRewards)\/([\w.]+)/i;
  const key = {
    0: 'ua',
    1: 'tag',
    2: 'version',
  };
  const userAgent = process.env.NODE_ENV === 'development' ?
    `${navigator.userAgent} MyRewards/5.x.0` :
    navigator.userAgent;
  const ua = parser(userAgent);
  const mr = {};
  const m = regex.exec(ua.ua);
  if (m !== null) {
    m.forEach((match, groupIndex) => {
      mr[key[groupIndex]] = match;
    });
  }
  return {
    ...ua,
    extend: {
      ...mr,
    },
  };
}

/**
 * @desc 數字千位數加上逗號
 * @param {number} number - 欲加上千位數逗號的數字
 * @return {string} - 加上千位數逗號的字串
 */
export function thousandseparator(number) {
  return number.toString().replace(/^0+/, '')
    .replace(/[^0-9]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * @desc 發mixpanel event
 * @param {eventName} eventName - 欲發送的 event 名稱
 * @param {properties} properties - 需要加上的屬性類型
 */
export function sendMixpanel(eventName, properties = null) {
  if (typeof (mixpanel) !== 'undefined') {
    mixpanel.track(eventName, properties);
  }
}

/**
 * @desc 判斷 element 是否捲動到底部
 * @param {number} scrollTop - element 目前已捲動的高度
 * @param {number} clientHeight - element 框架的高度
 * @param {number} elementHeight - element 內容的高度
 * @return {boolean} - element 是否捲動到底部
 */
export const isScrollEnd = (scrollTop, clientHeight, elementHeight) => (
  scrollTop + clientHeight >= elementHeight
);

/**
 * @desc email格式檢驗
 * @param {value} string - email
 * @param {msg} string - 如果驗證錯誤回傳的文字
 * @return {string} - 驗證結果
 */
export const emailValidate = curry((msg, value) => {
  const regexp = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'gi');
  const isValidate = value.match(regexp);
  return isValidate ? '' : msg;
});

/**
 * @desc 刪去非 ASCII 格式的文字
 * @param {value} string - 字串
 * @param {msg} string - 如果驗證錯誤回傳的文字
 * @return {string} - 驗證結果
 */
export const wordValidate = (value) => {
  const regexp = new RegExp(/[^\x00-\x7F]+\ *(?:[^\x00-\x7F]| )*/, 'g');
  return value.replace(regexp, '');
};

/**
 * @desc 計算月份的最後一天
 * @param {year} Number - 年份
 * @param {month} Number - 月份
 * @return {number} - 最後一天的號碼
 */
export const lastday = (year, month) => (
  new Date(year, month, 0).getDate()
);

/**
 * @desc 幫數字補 0 前綴字
 * @param {value} Number - 數字
 * @return {string} - 至少雙位數的字串
 */
export const addZero = (value) => {
  const isNeedZero = value.toString().length === 1;
  return isNeedZero ? `0${value}` : value.toString();
};

/**
 * @desc 在字串特定位置加上替換文字
 * @param {value} String - 原始字串
 * @param {index} Number - 替換文字欲插入的位置
 * @param {replacement} String - 替換文字
 * @return {string} - 調整後的文字
 */
export const replaceAt = (value, index, replacement) => {
  const text = value.toString();
  const res = text.substr(0, index) + replacement + text.substr(index + replacement.length);
  return res.substr(0, text.length);
};

/**
 * @desc 過濾字串長度並加上...
 * @param {value} String - 原始字串
 * @param {len} Number - 限制的長度
 * @param {replacement} String - 替換文字
 * @return {string} - 調整後的文字
 */
export const textLen = (value, len, replacement = '') => {
  const text = value.toString();
  return text.length > len
    ? text.substr(0, len) + replacement
    : text;
};

/**
 * @desc 依據目前步驟狀態, 取得該目標的步驟狀態
 * @param {nowstep} Number - 目前步驟數字
 * @param {prevStep} Number - 上一步的步驟數字
 * @param {stepNum} Number - 目標所屬步驟數字
 * @return {object} - 目標的步驟狀態
 */
export const getStepClass = (nowstep, prevStep, stepNum) => ({
  prevActive: nowstep === stepNum && prevStep === (stepNum + 1),
  active: nowstep === stepNum && prevStep === (stepNum - 1),
  afterActive: nowstep === (stepNum + 1) && prevStep === stepNum,
});

/**
 * @desc 判斷 router 是否在 allowPath 裡
 * @param {path} String - 欲檢查的 path
 * @param {allowPath} Array - 所有接受的 path
 * @return {boolean} - 是否在 allowPath 裡
 */
export const checkPath = (path, allowPath) => (
  allowPath.reduce((acc, cur) => (acc ? true : path === cur), false)
);
