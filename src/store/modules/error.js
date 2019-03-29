const basic = {
  isButton: true,
  isErrorActive: true,
  isCanClose: false,
};

const errorAction = {
  goBackApp: () => {
    location.href = 'mmo://Home?tab=featuredServices';
  },
  closeModal: (mutations, state) => {
    mutations.closeModal(state);
  },
};

const states = {
  error: {
    isErrorActive: false,
    isCanClose: false,
    isButton: true,
    message: '',
    txt: '',
  },
  clickAction: () => {},
};

const getters = {};

const actions = {
  closeModal({ commit }) {
    commit('closeModal');
  },
};

const mutations = {
  closeModal(state) {
    state.error.isErrorActive = false;
  },
  SOURCE_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: errorAction.goBackApp,
    };
  },
  FETCH_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: () => {
        errorAction[payload.errorActions](mutations, state);
      },
    };
  },
  UNDEFINDED_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: () => {
        errorAction[payload.errorActions](mutations, state);
      },
    };
  },
  NETWORK_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: () => {
        errorAction[payload.errorActions](mutations, state);
      },
    };
  },
  TYPE_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: errorAction.goBackApp,
    };
  },
  SERVER_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: () => {
        errorAction[payload.errorActions](mutations, state);
      },
    };
  },
  TPGS_GET_SERVICE_FLAG_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: () => {
        errorAction[payload.errorActions](mutations, state);
      },
    };
  },
  TPGS_USERID_EMPTY_ERROR(state, payload) {
    state.error = {
      ...payload,
      ...basic,
      clickAction: () => {
        errorAction[payload.errorActions](mutations, state);
      },
    };
  },
  TREEMALL_ERROR(state, payload) {
    state.error = {
      ...basic,
      message: `Treemall Error ${payload.statusId}`,
      txt: payload.statusDesc,
      root: true,
      clickAction: () => {
        errorAction.closeModal(mutations, state);
      },
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
