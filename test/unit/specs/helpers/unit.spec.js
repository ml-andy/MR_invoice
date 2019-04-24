import {
  parseQueryString,
  isScrollEnd,
  emailValidate,
  wordValidate,
  lastday,
  addZero,
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
  it('lastday testing', () => {
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
});
