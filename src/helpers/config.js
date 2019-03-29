function getConfig() {
  const config = {
    apiURL: '',
    mixpanelToken: '',
  };

  switch (window.location.host) {
    case 'localhost:8080':
    case '88.8.194.112':
      config.mixpanelToken = '4568fe9b8b11c57aebe5e40ac3d278d7';
      // UT
      // config.apiURL = '//88.8.194.119:8080/mobile-device-service/mds/';
      // localhost
      config.apiURL = '//localhost:3000/mobile-device-service/mds/';
      break;
    case 'smr.cathaybkdev.com.tw':
      // SIT
      config.mixpanelToken = '4568fe9b8b11c57aebe5e40ac3d278d7';
      config.apiURL = '//smr.cathaybkdev.com.tw:8082/zuul/mobile-device-service/mds/';
      break;
    case 'tmr.cathaybkdev.com.tw':
      // UAT
      config.mixpanelToken = '4568fe9b8b11c57aebe5e40ac3d278d7';
      config.apiURL = '//tmr.cathaybkdev.com.tw:8082/zuul/mobile-device-service/mds/';
      break;
    case 'myrewards-app.com.tw':
      // PRO
      config.mixpanelToken = '65e01d33d3c2a819679dc7f59d09aa5d';
      config.apiURL = '//myrewards-app.com.tw:8082/zuul/mobile-device-service/mds/';
      break;
    default:
      config.mixpanelToken = '65e01d33d3c2a819679dc7f59d09aa5d';
      config.apiURL = '//myrewards-app.com.tw:8082/zuul/mobile-device-service/mds/';
  }
  return config;
}

export default getConfig;
