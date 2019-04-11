import {
  parseQueryString,
  isScrollEnd,
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
});
