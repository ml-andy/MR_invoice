import {
  parseQueryString,
  isScrollEnd,
  emailValidate,
  wordValidate,
  lastday,
  addZero,
  replaceAt,
  textLen,
  getStepClass,
} from '@/helpers/unit';

describe('unit testing', () => {
  it('parseQueryString testing', () => {
    const testUrl = 'http://localhost?id=12345bb&token=asdfghjkl';
    const equalObj = {
      id: '12345bb',
      token: 'asdfghjkl',
    };
    expect(parseQueryString(testUrl)).toEqual(equalObj);
    const keys = Object.keys(parseQueryString('http://localhost'));
    expect(keys.length).toEqual(0);
  });
  it('isScrollEnd testing', () => {
    const testCase = [
      {
        scrollTop: 0,
        clientHeight: 100,
        elementHeight: 200,
        equalRes: false,
      },
      {
        scrollTop: 50,
        clientHeight: 100,
        elementHeight: 200,
        equalRes: false,
      },
      {
        scrollTop: 100,
        clientHeight: 100,
        elementHeight: 200,
        equalRes: true,
      },
      {
        scrollTop: 0,
        clientHeight: 200,
        elementHeight: 100,
        equalRes: true,
      },
    ];

    testCase.forEach(({ scrollTop, clientHeight, elementHeight, equalRes }) => {
      expect(isScrollEnd(scrollTop, clientHeight, elementHeight)).toEqual(equalRes);
    });
  });
  it('emailValidate testing', () => {
    const testCase = [
      {
        msg: 'email格式錯誤',
        value: 'andy',
        equalRes: 'email格式錯誤',
      },
      {
        msg: 'email格式錯誤',
        value: 'andy@yahoo',
        equalRes: 'email格式錯誤',
      },
      {
        msg: 'email格式錯誤',
        value: 'andy@yahoo.com',
        equalRes: '',
      },
    ];

    testCase.forEach(({ msg, value, equalRes }) => {
      expect(emailValidate(msg, value)).toEqual(equalRes);
    });
  });
  it('wordValidate testing', () => {
    const testCase = [
      {
        value: '我',
        equalRes: '',
      },
      {
        value: 'abc',
        equalRes: 'abc',
      },
      {
        value: '@@@',
        equalRes: '@@@',
      },
      {
        value: 'ㄅㄆ',
        equalRes: '',
      },
    ];

    testCase.forEach(({ value, equalRes }) => {
      expect(wordValidate(value)).toEqual(equalRes);
    });
  });
  it('lastday testing', () => {
    const testCase = [
      {
        year: 2019,
        month: 1,
        equalRes: 31,
      },
      {
        year: 2019,
        month: 2,
        equalRes: 28,
      },
      {
        year: 2019,
        month: 11,
        equalRes: 30,
      },
      {
        year: 2020,
        month: 2,
        equalRes: 29,
      },
    ];

    testCase.forEach(({ year, month, equalRes }) => {
      expect(lastday(year, month)).toEqual(equalRes);
    });
  });
  it('addZero testing', () => {
    const testCase = [
      {
        value: 1,
        equalRes: '01',
      },
      {
        value: 11,
        equalRes: '11',
      },
      {
        value: 132,
        equalRes: '132',
      },
      {
        value: 9,
        equalRes: '09',
      },
      {
        value: 10,
        equalRes: '10',
      },
    ];

    testCase.forEach(({ value, equalRes }) => {
      expect(addZero(value)).toEqual(equalRes);
    });
  });
  it('replaceAt testing', () => {
    const testCase = [
      {
        value: '0912345678',
        index: 4,
        replacement: '***',
        equalRes: '0912***678',
      },
      {
        value: 12345678,
        index: 4,
        replacement: '***',
        equalRes: '1234***8',
      },
      {
        value: 1234,
        index: 4,
        replacement: '***',
        equalRes: '1234',
      },
      {
        value: 1234,
        index: 0,
        replacement: '***',
        equalRes: '***4',
      },
    ];

    testCase.forEach(({ value, index, replacement, equalRes }) => {
      expect(replaceAt(value, index, replacement)).toEqual(equalRes);
    });
  });
  it('textLen testing', () => {
    const testCase = [
      {
        value: '統一超商股份有限公司台北信義分店',
        len: 10,
        replacement: '...',
        equalRes: '統一超商股份有限公司...',
      },
      {
        value: '統一超商股份有限公司台北信義分店',
        len: 10,
        replacement: '***',
        equalRes: '統一超商股份有限公司***',
      },
      {
        value: '統一超商股份有限公司',
        len: 10,
        replacement: '...',
        equalRes: '統一超商股份有限公司',
      },
      {
        value: '統一超商',
        len: 10,
        replacement: '...',
        equalRes: '統一超商',
      },
    ];

    testCase.forEach(({ value, len, replacement, equalRes }) => {
      expect(textLen(value, len, replacement)).toEqual(equalRes);
    });
  });
  it('getStepClass testing', () => {
    const testCase = [
      {
        nowstep: 1,
        prevStep: 0,
        stepNum: 1,
        equalRes: {
          prevActive: false,
          active: true,
          afterActive: false,
        },
      },
      {
        nowstep: 2,
        prevStep: 1,
        stepNum: 1,
        equalRes: {
          prevActive: false,
          active: false,
          afterActive: true,
        },
      },
      {
        nowstep: 1,
        prevStep: 2,
        stepNum: 1,
        equalRes: {
          prevActive: true,
          active: false,
          afterActive: false,
        },
      },
    ];

    testCase.forEach(({ nowstep, prevStep, stepNum, equalRes }) => {
      expect(getStepClass(nowstep, prevStep, stepNum)).toEqual(equalRes);
    });
  });
});
