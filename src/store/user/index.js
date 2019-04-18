import * as types from './types'
import { setToken, getUser, logoutPost } from '@/api/user'

const state = {
  authed: false,
  id: '',
  token: '',
  name: '',
  nick_name: '',
  address: '',
  balance: 0,
  wish_count: 0,
  wish_limit: 0,
}

const getters = {
}

const mutations = {
  [types.CHANGE_USER] (state, {
    authed, id, token, name,
    nick_name, balance, address,
    wish_count, wish_limit}) {
    if (typeof authed !== 'undefined') state.authed = authed;
    if (typeof id !== 'undefined') state.id = id;
    if (typeof token !== 'undefined') state.token = token;
    if (typeof name !== 'undefined') state.name = name;
    if (typeof balance !== 'undefined') state.balance = balance;
    if (typeof nick_name !== 'undefined') state.nick_name = nick_name;
    if (typeof address !== 'undefined') state.address = address;
    if (typeof wish_count !== 'undefined') state.wish_count = wish_count;
    if (typeof wish_limit !== 'undefined') state.wish_limit = wish_limit;
  },
  [types.USER_LOGIN] (state, { id, token }) {
    state.id = id;
    state.token = token;
    localStorage.setItem('token', token);
  },
  [types.CLEAR_USER] (state) {
    state.authed = false;
    state.id = '';
    state.token = '';
    state.name = '';
    state.balance = 0;
    state.nick_name = '';
    state.address = '';
    state.wish_count = 0;
    state.wish_limit = 0;
    localStorage.removeItem("token");
  },
}

const actions = {
  [types.CHECK_LOGIN] ({ commit, state, getters, dispatch }) {
    var token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    setToken(token);
    getUser().then(res => {
      if (res.error && res.error_code == 401) {
        commit(types.CLEAR_USER);
      } else {
        commit(types.CHANGE_USER, {
          authed: true,
          id: res.id,
          token: res.token,
          name: res.name,
          balance: res.balance,
          nick_name: res.nick_name,
          address: res.address,
          wish_count: res.wish_count,
          wish_limit: res.wish_limit,
        });
      }
    }).catch(err => {
      console.log(err);
    })
  },
  [types.USER_LOGOUT] ({ commit, state, getters }) {
    logoutPost()
    commit(types.CLEAR_USER);
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
