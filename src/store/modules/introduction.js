const states = {
  prevStep: 0,
  step: 0,
};

const mutations = {
  fetchState(state, payload) {
    const { key, value } = payload;
    state[key] = value;
  },
};

export default {
  namespaced: true,
  state: states,
  mutations,
};
