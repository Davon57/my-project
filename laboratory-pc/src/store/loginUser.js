/* eslint-disable no-param-reassign */
import * as loginServ from '../service/loginService';

export default {
  // namespaced: true,
  state: {
    data: null,
    userList: null,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setUserList(state, payload) {
      state.userList = payload;
    },
  },
  actions: {
    async login({ commit }, { loginId, loginPwd }) {
      const resp = await loginServ.login(loginId, loginPwd);
      commit('setData', resp.data);
      return resp.data;
    },
    loginOut({ commit }) {
      commit('setData', null);
      loginServ.loginOut();
    },
    async whoAmI({ commit }) {
      try {
        const resp = await loginServ.whoAmI();
        commit('setData', resp.data);
      } catch {
        commit('setData', null);
      }
    },
    async getUsers({ commit }, page, limit, keywords) {
      const resp = await loginServ.getUsers(page, limit, keywords);
      commit('setUserList', resp.data);
      return resp.data;
    },
  },
};
