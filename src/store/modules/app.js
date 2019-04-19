import client from '@/helpers/ClientTransport';
import getConfig from '@/helpers/config';
import {
  getCookie,
  setCookie,
  getUA,
  sendMixpanel,
} from '@/helpers/unit';
import { SOURCE_ERROR, PASSWORD_ERROR } from '@/constant/apiErrorTypes';

const states = {
  isInit: false,
  cardNo: '',
  isBound: false,
  included: null,
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

        const response = await client.fetch({
          method: 'get',
          url: '/es/user/cardno-status',
        });
        commit('fetchBound', response);
      } else {
        commit('rootLoading/activeStatus', false, { root: true });
        commit(SOURCE_ERROR.commit, SOURCE_ERROR, { root: true });
        return;
      }
      commit('initSetup');
    } catch (error) {
      commit(error.commit, error.info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async getCarrierCheck({ commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      const response = await client.fetch({
        method: 'post',
        url: '/es/inclusion/carrier-check',
      });
      commit('fetchIncluded', response);
    } catch (error) {
      const { errorCode } = error.info;
      if (errorCode === PASSWORD_ERROR.errorCode) {
        commit(PASSWORD_ERROR.commit, PASSWORD_ERROR, { root: true });
      } else {
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
};

const mutations = {
  initSetup(state) {
    state.isInit = true;
  },
  fetchBound(state, payload) {
    const {
      cardNo = '',
      isBound = false,
    } = payload;
    state.cardNo = cardNo;
    state.isBound = isBound;
  },
  fetchIncluded(state, payload) {
    const {
      cardNo = '',
      included = false,
    } = payload;
    state.cardNo = cardNo;
    state.included = included;
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
