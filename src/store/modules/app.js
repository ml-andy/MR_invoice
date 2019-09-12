import client from '@/helpers/ClientTransport';
import getConfig from '@/helpers/config';
import {
  getCookie,
  setCookie,
  getUA,
  // sendMixpanel,
  replaceAt,
} from '@/helpers/unit';
import { SOURCE_ERROR } from '@/constant/apiErrorTypes';

const states = {
  isInit: true,
  os: {
    isIos: false,
    isAndroid: false,
    name: '',
  },
  basicInfo: {
    cardNumber: '',
    cardName: '',
    birth: '',
    id: '',
    phone: '',
  },
  windowOriginHeight: -1,
  windowHeight: -1,
  windowWidth: -1,
};

const getters = {};

const actions = {
  async appInit({ commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      if (process.env.NODE_ENV === 'development') {
        setCookie('mmo_token', 'LfLU9iSSfZpjbQRCfpAhl4Ic.f909cbf9-0fd5-3f69-9bdd-78fdab3035da1556270703656');
        setCookie('mmo_identity', '551279XIDdiufWuN04mXQNpKYTf7Z2wWa1bG2SXBovsPSriSw=');
        setCookie('mmo_tracking_id', 'invoice_test');
      }
      const config = getConfig();
      const mrToken = getCookie('mmo_token');
      // const mrTrackingId = getCookie('mmo_tracking_id');
      const mrIdentity = getCookie('mmo_identity');
      const ua = getUA();
      commit('fetchOS', ua);
      if (mrToken && Object.keys(ua.extend).length && ua.extend.tag === 'MyRewards') {
        client.updateBaseURL(config.apiURL);
        client.updateHeaders({
          'X-Auth-Token': mrToken,
          'X-Identity': mrIdentity,
        });
        // if (typeof (mixpanel) !== 'undefined') {
        //   mixpanel.init(config.mixpanelToken);
        //   if (mrTrackingId) {
        //     mixpanel.identify(mrTrackingId);
        //   }
        //   sendMixpanel('invoice_main_view');
        // }
      } else {
        commit('rootLoading/activeStatus', false, { root: true });
        commit(SOURCE_ERROR.commit, SOURCE_ERROR, { root: true });
        return;
      }
      // const response = await client.fetch([
      //   {
      //     method: 'get',
      //     url: '/es/user/cardno-status',
      //   },
      //   {
      //     method: 'get',
      //     url: '/es/user/basic-info',
      //     params: {
      //       card: 1,
      //       account: 1,
      //     },
      //   },
      // ]);
      // commit('phonecode/fetchBound', response[0], { root: true });
      // commit('fetchBasicInfo', response[1]);

      // const { cardName } = response[1];
      // const carrierName = cardName;
      // commit('phonecode/fetchState', {
      //   key: 'carrierName',
      //   value: carrierName,
      // }, { root: true });
    } catch (error) {
      commit(error.commit, error.info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
};

const mutations = {
  initSetup(state) {
    state.isInit = true;
  },
  fetchOS(state, ua) {
    const { os = {} } = ua;
    const { name = '' } = os;
    const osName = name.toLowerCase() || '';
    state.os = {
      isIos: osName === 'ios',
      isAndroid: osName === 'android',
      name: osName,
    };
  },
  fetchBasicInfo(state, payload) {
    const hiddenPhone = replaceAt(payload.phone, 4, '***');
    state.basicInfo = {
      ...payload,
      hiddenPhone,
    };
  },
  fetchWindowOriginHeight(state, payload) {
    const { innerHeight } = payload;
    state.windowOriginHeight = innerHeight;
  },
  fetchWindowSize(state, payload) {
    const { innerHeight, innerWidth } = payload;
    state.windowHeight = innerHeight;
    state.windowWidth = innerWidth;
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
