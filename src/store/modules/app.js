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
};

const getters = {};

const actions = {
  async appInit({ commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      if (process.env.NODE_ENV === 'development') {
        setCookie('mmo_token', 'K+RHfVUSh+Z97Gagjs-5w1TW.a5b00e2c-3334-3acd-9c37-9047b95ae0ce1547882260004');
      }
      const config = getConfig();
      const mrToken = getCookie('mmo_token');
      const mrTrackingId = getCookie('mmo_tracking_id');
      const ua = getUA();
      if (mrToken && Object.keys(ua.extend).length && ua.extend.tag === 'MyRewards') {
        client.updateBaseURL(config.apiURL);
        client.updateHeaders({
          'X-Auth-Token': mrToken,
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
      commit('initSetup');
    } catch (error) {
      const info = {
        ...error.info,
        errorActions: 'goBackApp',
      };
      commit(error.commit, info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
};

const mutations = {
  fetchAgreement(state, isAgree) {
    state.isAgree = isAgree;
  },
  fetchThirdParty(state, thirdParty) {
    state.thirdParty = thirdParty;
  },
  initSetup(state) {
    state.isInit = true;
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};