import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import error from './modules/error';
import rootLoading from './modules/rootLoading';
import phonecode from './modules/phonecode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  modules: {
    app,
    error,
    rootLoading,
    phonecode,
  },
});
