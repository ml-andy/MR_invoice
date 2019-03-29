import client from '@/helpers/ClientTransport';
import getConfig from '@/helpers/config';
import {
  getCookie,
  setCookie,
  getUA,
  parseQueryString,
  mapThirdParty,
  redirectThirdParty,
} from '@/helpers/unit';
import { SOURCE_ERROR, TYPE_ERROR } from '@/constant/apiErrorTypes';

const initThirdParty = {
  name: '',
  type: '',
  image: '',
  agreement: {
    header: '',
    body: '',
  },
  url: '',
};

const states = {
  thirdParty: {
    ...initThirdParty,
  },
  isAgree: false,
  isInit: false,
};

const getters = {};

const actions = {
  async getThirdParty({ commit }) {
    try {
      const response = await client.fetch({
        method: 'get',
        url: 'static/jsons/thirdPartys.json',
        baseURL: '',
      });

      const { service } = parseQueryString(location.href);
      const target = response.find(item => item.type === service);
      const thirdParty = mapThirdParty(window.location.host, target);
      if (target && thirdParty.url) {
        commit('fetchThirdParty', thirdParty);
      } else {
        commit(TYPE_ERROR.commit, TYPE_ERROR, { root: true });
      }
    } catch (error) {
      commit(TYPE_ERROR.commit, TYPE_ERROR, { root: true });
    }
  },
  async appInit({ commit, state }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      if (process.env.NODE_ENV === 'development') {
        setCookie('mmo_token', 'K+RHfVUSh+Z97Gagjs-5w1TW.a5b00e2c-3334-3acd-9c37-9047b95ae0ce1547882260004');
      }
      const config = getConfig();
      const mrToken = getCookie('mmo_token');
      // const mrTrackingId = getCookie('mmo_tracking_id');
      const ua = getUA();
      if (mrToken && Object.keys(ua.extend).length && ua.extend.tag === 'MyRewards') {
        client.updateBaseURL(config.apiURL);
        client.updateHeaders({
          'X-Auth-Token': mrToken,
        });
        // if (typeof (mixpanel) !== 'undefined') {
        //   mixpanel.init(config.mixpanelToken);
        //   if (mrTrackingId) {
        //     mixpanel.identify(mrTrackingId);
        //   }
        // }
      } else {
        commit('rootLoading/activeStatus', false, { root: true });
        commit(SOURCE_ERROR.commit, SOURCE_ERROR, { root: true });
        return;
      }
      const response = await client.fetch({
        method: 'get',
        url: '/thirdparty/agreement',
        params: {
          thirdparty: state.thirdParty.type,
        },
      });
      const { agreeStatus } = response;
      commit('initSetup', agreeStatus);
    } catch (error) {
      const info = {
        ...error.info,
        errorActions: 'goBackApp',
      };
      commit(error.commit, info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async editAgreement({ commit, state }) {
    commit('fetchAgreement', true);
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      await client.fetch({
        method: 'post',
        url: '/thirdparty/agreement',
        params: {
          thirdparty: state.thirdParty.type,
        },
      });
      redirectThirdParty({
        url: state.thirdParty.url,
        mixpanel: true,
      });
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
  initSetup(state, agreeStatus) {
    state.isInit = true;

    const isAgree = agreeStatus === 'AGREE';
    state.isAgree = isAgree;
    if (isAgree) {
      redirectThirdParty({
        url: state.thirdParty.url,
        mixpanel: true,
      });
    }
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
