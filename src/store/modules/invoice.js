import client from '@/helpers/ClientTransport';
import { UPDATE_ERROR } from '@/constant/apiErrorTypes';
import { lastday, addZero } from '@/helpers/unit';

const initApiError = {
  errorCode: '',
  message: '',
};

const states = {
  invoices: [],
  invoiceDetail: {},
  apiError: {
    ...initApiError,
  },
};

const getters = {
  invoiceDetail: (state) => {
    const { invDate = '', invoiceTime } = state.invoiceDetail;
    let time = '';
    if (invDate) {
      const date = invDate.split('/');
      date[0] = (date[0] * 1) - 1911;
      const resDate = date.join('-');
      time = `${resDate} ${invoiceTime}`;
    }
    return {
      ...state.invoiceDetail,
      time,
    };
  },
};

const actions = {
  async getInvoiceList({ state, commit }, idx) {
    commit('rootLoading/activeStatus', true, { root: true });
    commit('initApiError');
    try {
      const { startDate, endDate } = state.invoices[idx];
      const data = {
        startDate,
        endDate,
      };
      const response = await client.fetch({
        method: 'post',
        url: '/es/info/invoices',
        data,
      });
      const { carrierName = '', list = [] } = response;
      commit('phonecode/fetchState', {
        key: 'carrierName',
        value: carrierName,
      }, { root: true });
      commit('fetchInvoices', { idx, list });
    } catch (error) {
      const { errorCode } = error.info;
      if (errorCode === UPDATE_ERROR.errorCode) {
        commit(UPDATE_ERROR.commit, UPDATE_ERROR, { root: true });
      } else {
        commit('fetchApiError', error.info);
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
  async getInvoiceDetail({ commit }, payload) {
    commit('rootLoading/activeStatus', true, { root: true });
    commit('initApiError');
    try {
      const {
        invNum = '',
        invDate = '',
        sellerName = '',
        amount = 0,
      } = payload;
      const response = await client.fetch({
        method: 'post',
        url: '/es/info/invoices/detail',
        data: {
          invNum,
          invDate,
          sellerName,
          amount,
        },
      });
      commit('fetchInvoiceDetail', {
        detail: response,
        invNum,
        invDate,
      });
    } catch (error) {
      const { errorCode } = error.info;
      if (errorCode === UPDATE_ERROR.errorCode) {
        commit(UPDATE_ERROR.commit, UPDATE_ERROR, { root: true });
      } else {
        commit('fetchApiError', error.info);
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
};

const mutations = {
  initInvoice(state) {
    const list = [...new Array(3)];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    state.invoices = list.reduce((acc, cur, idx) => {
      let dateMonth = month - (idx * 2);
      let stageYear = year;
      if (dateMonth <= 0) {
        dateMonth += 12;
        stageYear -= 1;
      }

      const stageMonth = dateMonth % 2 === 0
        ? [dateMonth - 1, dateMonth]
        : [dateMonth, dateMonth + 1];

      const resYear = stageYear - 1911;
      const resMonth = `${addZero(stageMonth[0])}-${addZero(stageMonth[1])}`;
      const startDate = `${stageYear}/${addZero(stageMonth[0])}/${lastday(stageYear, stageMonth[0])}`;
      const endDate = `${stageYear}/${addZero(stageMonth[1])}/${lastday(stageYear, stageMonth[1])}`;
      const stage = {
        year: resYear,
        month: resMonth,
        startDate,
        endDate,
        isFetch: false,
        list: [],
      };

      return [
        stage,
        ...acc,
      ];
    }, []);
  },
  fetchState(state, payload) {
    const { key, value } = payload;
    state[key] = value;
    state.apiError = { ...initApiError };
  },
  fetchInvoices(state, { idx, list }) {
    state.invoices[idx].isFetch = true;
    state.invoices[idx].list = list;
  },
  fetchInvoiceDetail(state, { detail = {}, invNum, invDate }) {
    state.invoiceDetail = {
      invNum,
      invDate,
      ...detail,
    };
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