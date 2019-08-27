const basic = {
  isErrorActive: false,
  isCanClose: false,
  isButton: true,
  message: '',
  txt: '',
  customEvent: null,
  buttonTxt: '確定',
};

const states = {
  error: {
    ...basic,
  },
};

const getters = {};

const actions = {
  clickHandler({ state, commit }) {
    if (state.error.customEvent) {
      state.error.customEvent();
    }
    commit('closeModal');
    commit('initError');
  },
  closeModal({ commit }) {
    commit('closeModal');
    commit('initError');
  },
};

const mutations = {
  initError(state) {
    state.error = { ...basic };
  },
  closeModal(state) {
    state.error.isErrorActive = false;
  },
  EDIT_ERROR(state, payload) {
    state.error = {
      ...basic,
      isErrorActive: true,
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
