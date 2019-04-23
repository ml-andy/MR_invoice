import client from '@/helpers/ClientTransport';
import getConfig from '@/helpers/config';
import {
  getCookie,
  setCookie,
  getUA,
  sendMixpanel,
} from '@/helpers/unit';
import { SOURCE_ERROR } from '@/constant/apiErrorTypes';

const states = {
  isInit: false,
  basicInfo: {
    cardNumber: '',
    cardName: '',
    birth: '',
    id: '',
    phone: '',
  },
};

const getters = {};

const actions = {
  async appInit({ commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      if (process.env.NODE_ENV === 'development') {
        setCookie('mmo_token', 'K+RHfVUSh+Z97Gagjs-5w1TW.a5b00e2c-3334-3acd-9c37-9047b95ae0ce1547882260004');
        setCookie('mmo_identity', '158496ZgBPgFdlVdtn2z3kdr/7EqgDacg2/JIVleVK1cA4WlY=');
      }
      const config = getConfig();
      const mrToken = getCookie('mmo_token');
      const mrTrackingId = getCookie('mmo_tracking_id');
      const mrIdentity = getCookie('mmo_identity');
      const ua = getUA();
      if (mrToken && Object.keys(ua.extend).length && ua.extend.tag === 'MyRewards') {
        client.updateBaseURL(config.apiURL);
        client.updateHeaders({
          'X-Auth-Token': mrToken,
          'X-Identity': mrIdentity,
        });
        if (typeof (mixpanel) !== 'undefined') {
          mixpanel.init(config.mixpanelToken);
          if (mrTrackingId) {
            mixpanel.identify(mrTrackingId);
          }
          sendMixpanel('invoice_main_view');
        }
      } else {
        commit('rootLoading/activeStatus', false, { root: true });
        commit(SOURCE_ERROR.commit, SOURCE_ERROR, { root: true });
        return;
      }
      const response = await client.fetch([
        {
          method: 'get',
          url: '/es/user/cardno-status',
        },
        {
          method: 'get',
          url: '/es/user/basic-info',
          params: {
            card: 1,
            account: 1,
          },
        },
      ]);
      commit('phonecode/fetchBound', response[0], { root: true });
      commit('fetchBasicInfo', response[1]);
      commit('initSetup');

      const { cardName } = response[1];
      const carrierName = `信用卡-${cardName}`;
      commit('phonecode/fetchState', {
        key: 'carrierName',
        value: carrierName,
      }, { root: true });
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
  fetchBasicInfo(state, payload) {
    state.basicInfo = {
      ...payload,
    };
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
