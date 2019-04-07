const states = {
  isActive: false,
};

const getters = {};

const actions = {};

const mutations = {
  activeStatus(state, payload) {
    state.isActive = payload;
  },
};

export default {
  namespaced: true,
  state: states,
  getters,
  actions,
  mutations,
};
