import client from '@/helpers/ClientTransport';
import { PASSWORD_ERROR } from '@/constant/apiErrorTypes';

const initApiError = {
  errorCode: '',
  message: '',
};

const states = {
  cardNo: '',
  isBound: false,
  included: null,
  email: '',
  verifyCode: '',
  apiError: {
    ...initApiError,
  },
};

const getters = {};

const actions = {
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
        commit('fetchApiError', error.info);
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async signup({ state, commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      const response = await client.fetch({
        method: 'post',
        url: '/es/user/cardno',
        data: {
          email: state.email,
        },
      });
      commit('fetchCardNo', response);
    } catch (error) {
      commit('fetchApiError', error.info);
      commit(error.commit, error.info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async modifyCardno({ state, commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      const data = {
        verifyCode: state.verifyCode,
        email: state.email,
      };
      const response = await client.fetch({
        method: 'post',
        url: '/es/user/modify-cardno',
        data,
      });
      commit('fetchCardNo', response);
    } catch (error) {
      commit('fetchApiError', error.info);
      commit('fetchState', {
        key: 'cardNo',
        value: '',
      });
      commit(error.commit, error.info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
};

const mutations = {
  fetchState(state, payload) {
    const { key, value } = payload;
    state[key] = value;
    state.apiError = { ...initApiError };
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
  fetchCardNo(state, payload) {
    const { cardNo } = payload;
    state.cardNo = cardNo;
  },
  initApiError(state) {
    state.apiError = { ...initApiError };
  },
  fetchApiError(state, payload) {
    state.apiError = payload;
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
