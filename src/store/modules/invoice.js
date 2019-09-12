import client from '@/helpers/ClientTransport';
import { UPDATE_ERROR } from '@/constant/apiErrorTypes';
import { lastday, addZero } from '@/helpers/unit';

const initApiError = {
  errorCode: '',
  message: '',
};

const states = {
  isInitInvoice: true,
  invoices: [
    {
      endDate: '2019/06/30',
      isFetch: true,
      list: [
        {
          rowNum: 1,
          invNum: 'BA123456',
          sellerName: '統一超商股份有限公司台北信義分店',
          amount: '999,999',
          invPeriod: 10804,
          invYear: 108,
          invMonth: '05',
          invDay: 1,
          isWin: false,
        },
        {
          rowNum: 2,
          invNum: 'BA123457',
          sellerName: 'COSTO 樹林店',
          amount: 500,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '06',
          invDay: '01',
          isWin: true,
        },
        {
          rowNum: 1,
          invNum: 'BA123456',
          sellerName: 'COSTO 新莊店',
          amount: 1000,
          invPeriod: 10804,
          invYear: 108,
          invMonth: '05',
          invDay: '03',
          isWin: false,
        },
        {
          rowNum: 2,
          invNum: 'BA123458',
          sellerName: 'COSTO 內湖店',
          amount: 300,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '06',
          invDay: '03',
          isWin: true,
        },
        {
          rowNum: 2,
          invNum: 'BA123457',
          sellerName: 'COSTO 樹林店',
          amount: 500,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '05',
          invDay: '03',
          isWin: true,
        },
      ],
      month: '05-06',
      startDate: '2019/05/01',
      year: 108,
    },
    {
      endDate: '2019/08/31',
      isFetch: true,
      list: [
        {
          rowNum: 1,
          invNum: 'BA123456',
          sellerName: '統一超商股份有限公司台北信義分店',
          amount: '999,999',
          invPeriod: 10804,
          invYear: 108,
          invMonth: '07',
          invDay: 1,
          isWin: false,
        },
        {
          rowNum: 2,
          invNum: 'BA123457',
          sellerName: 'COSTO 樹林店',
          amount: 500,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '07',
          invDay: '01',
          isWin: true,
        },
        {
          rowNum: 1,
          invNum: 'BA123456',
          sellerName: 'COSTO 新莊店',
          amount: 1000,
          invPeriod: 10804,
          invYear: 108,
          invMonth: '08',
          invDay: '03',
          isWin: false,
        },
        {
          rowNum: 2,
          invNum: 'BA123458',
          sellerName: 'COSTO 內湖店',
          amount: 300,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '08',
          invDay: '03',
          isWin: true,
        },
        {
          rowNum: 2,
          invNum: 'BA123457',
          sellerName: 'COSTO 樹林店',
          amount: 500,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '08',
          invDay: '03',
          isWin: true,
        },
      ],
      month: '07-08',
      startDate: '2019/07/01',
      year: 108,
    },
    {
      endDate: '2019/10/31',
      isFetch: true,
      list: [
        {
          rowNum: 1,
          invNum: 'BA123456',
          sellerName: '統一超商股份有限公司台北信義分店',
          amount: '999,999',
          invPeriod: 10804,
          invYear: 108,
          invMonth: '10',
          invDay: 1,
          isWin: false,
        },
        {
          rowNum: 2,
          invNum: 'BA123457',
          sellerName: 'COSTO 樹林店',
          amount: 500,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '10',
          invDay: '01',
          isWin: true,
        },
        {
          rowNum: 1,
          invNum: 'BA123456',
          sellerName: 'COSTO 新莊店',
          amount: 1000,
          invPeriod: 10804,
          invYear: 108,
          invMonth: '10',
          invDay: '03',
          isWin: false,
        },
        {
          rowNum: 2,
          invNum: 'BA123458',
          sellerName: 'COSTO 內湖店',
          amount: 300,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '10',
          invDay: '03',
          isWin: true,
        },
        {
          rowNum: 2,
          invNum: 'BA123457',
          sellerName: 'COSTO 樹林店',
          amount: 500,
          invPeriod: 10802,
          invYear: 108,
          invMonth: '09',
          invDay: '03',
          isWin: true,
        },
      ],
      month: '09-10',
      startDate: '2019/09/01',
      year: 108,
    },
  ],
  invoicesIndex: 2,
  invoiceDetail: {
    amount: '96',
    details: [
      {
        description: '五月花衛生紙10包超值組合',
        quantity: '1',
        rowNum: '1',
        subtotal: '100',
        unitPrice: '100',
      },
      {
        description: '五月花衛生紙10包超值組合',
        quantity: '2',
        rowNum: '2',
        subtotal: '200',
        unitPrice: '100',
      },
    ],
    invDate: '2019/03/03',
    invNum: 'BA123456',
    invoiceTime: '13:09:02',
    sellerName: 'COSTO 新莊店',
  },
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
      date[1] = addZero(date[1]);
      date[2] = addZero(date[2]);
      const resDate = date.join(' / ');
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
      commit('fetchApiError', error.info);
      if (errorCode === UPDATE_ERROR.errorCode) {
        commit(UPDATE_ERROR.commit, UPDATE_ERROR, { root: true });
      } else {
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
      commit('fetchApiError', error.info);
      if (errorCode === UPDATE_ERROR.errorCode) {
        commit(UPDATE_ERROR.commit, UPDATE_ERROR, { root: true });
      } else {
        commit(error.commit, error.info, { root: true });
      }
    }
    commit('rootLoading/activeStatus', false, { root: true });
  },
};

const mutations = {
  initInvoice(state) {
    if (state.isInitInvoice) return;

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
      const startDate = `${stageYear}/${addZero(stageMonth[0])}/01`;
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
    state.isInitInvoice = true;
  },
  fetchState(state, payload) {
    const { key, value } = payload;
    state[key] = value;
    state.apiError = { ...initApiError };
  },
  fetchInvoices(state, { idx, list }) {
    state.invoices[idx].isFetch = true;
    const sortList = [...list].sort((a, b) => {
      const aTime = new Date((a.invYear * 1) + 1911, a.invMonth, a.invDay);
      const bTime = new Date((b.invYear * 1) + 1911, b.invMonth, b.invDay);
      return bTime - aTime;
    });
    state.invoices[idx].list = sortList;
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
