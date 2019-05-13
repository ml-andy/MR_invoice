import client from '@/helpers/ClientTransport';
import {
  UPDATE_ERROR,
  PASSWORD_ERROR,
  SIGNUP_ERROR,
  ES_CARRIER_NAME_OVER_LIMIT_ERROR,
} from '@/constant/apiErrorTypes';

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
  verifyCodeImage: '',
  carrierName: '',
  imageCode: '',
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
      commit('fetchApiError', error.info);
      if (errorCode === UPDATE_ERROR.errorCode) {
        commit(UPDATE_ERROR.commit, UPDATE_ERROR, { root: true });
      } else {
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
      const { cardNo } = response;
      commit('fetchState', {
        key: 'cardNo',
        value: cardNo,
      });
    } catch (error) {
      const { errorCode } = error.info;
      commit('fetchApiError', error.info);
      if (errorCode === SIGNUP_ERROR.errorCode) {
        commit(SIGNUP_ERROR.commit, SIGNUP_ERROR, { root: true });
      } else {
        commit(error.commit, error.info, { root: true });
      }
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
      const { cardNo } = response;
      commit('fetchState', {
        key: 'cardNo',
        value: cardNo,
      });
    } catch (error) {
      const { errorCode } = error.info;
      commit('fetchApiError', error.info);
      if (errorCode !== PASSWORD_ERROR.errorCode) {
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async getVerifyCodeImage({ commit }) {
    try {
      const response = await client.fetch({
        method: 'get',
        url: '/es/inclusion/verify-code-image',
      });
      const { imageString } = response;
      commit('fetchState', {
        key: 'verifyCodeImage',
        value: imageString,
      });
    } catch (error) {
      commit('fetchApiError', error.info);
      commit(error.commit, error.info, { root: true });
    }
  },
  async editInclusion({ state, commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      const data = {
        carrierName: state.carrierName,
        imagecode: state.imageCode,
        cardNo: state.cardNo,
      };
      await client.fetch({
        method: 'post',
        url: '/es/inclusion/include',
        data,
      });
    } catch (error) {
      commit('fetchApiError', error.info);
      const { errorCode } = error.info;
      if (errorCode !== ES_CARRIER_NAME_OVER_LIMIT_ERROR.errorCode) {
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async forgetVerifyCode({ state, commit }, phoneNo) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      const data = {
        email: state.email,
        phoneNo,
      };
      await client.fetch({
        method: 'post',
        url: '/es/user/forget-verify-code',
        data,
      });
    } catch (error) {
      commit('fetchApiError', error.info);
      commit(error.commit, error.info, { root: true });
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async putCardno({ state, commit }) {
    commit('rootLoading/activeStatus', true, { root: true });
    try {
      const data = {
        verifyCode: state.verifyCode,
      };
      const response = await client.fetch({
        method: 'put',
        url: '/es/user/modify-cardno',
        data,
      });
      const { cardNo } = response;
      commit('fetchState', {
        key: 'cardNo',
        value: cardNo,
      });
    } catch (error) {
      const { errorCode } = error.info;
      commit('fetchApiError', error.info);
      if (errorCode !== PASSWORD_ERROR.errorCode) {
        commit(error.commit, error.info, { root: true });
      }
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
    if (isBound === 'true') {
      state.isBound = true;
    } else {
      state.isBound = false;
    }
  },
  fetchIncluded(state, payload) {
    const {
      cardNo = '',
      included = false,
    } = payload;
    state.cardNo = cardNo;
    state.included = included;
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
