import {
  parseQueryString,
  mapThirdParty,
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
  it('mapThirdParty testing', () => {
    const testCase = [
      {
        host: 'localhost:8080',
        target: {
          name: '麻吉付',
          type: 'AUTOPASS',
          devUrl: 'https://cathay-my-rewards-client-alpha-mochipay.pklotcorp.com/',
          prodUrl: '',
        },
        equalRes: {
          name: '麻吉付',
          type: 'AUTOPASS',
          devUrl: 'https://cathay-my-rewards-client-alpha-mochipay.pklotcorp.com/',
          prodUrl: '',
          url: 'https://cathay-my-rewards-client-alpha-mochipay.pklotcorp.com/',
        },
      },
      {
        host: 'localhost:8080',
        target: {
          name: '麻吉付',
          type: 'AUTOPASS',
        },
        equalRes: {
          name: '麻吉付',
          type: 'AUTOPASS',
          url: '',
        },
      },
      {
        host: 'myrewards-app.com.tw',
        target: {
          name: '麻吉付',
          type: 'AUTOPASS',
          devUrl: 'https://cathay-my-rewards-client-alpha-mochipay.pklotcorp.com/',
          prodUrl: '',
        },
        equalRes: {
          name: '麻吉付',
          type: 'AUTOPASS',
          devUrl: 'https://cathay-my-rewards-client-alpha-mochipay.pklotcorp.com/',
          prodUrl: '',
          url: '',
        },
      },
    ];

    testCase.forEach(({ host, target, equalRes }) => {
      expect(mapThirdParty(host, target)).toEqual(equalRes);
    });
  });
});
