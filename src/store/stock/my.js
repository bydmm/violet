import * as types from './types'
import { CHANGE_USER } from '@/store/user/types'
import * as stockAPI from '@/api/stock/'
import * as userAPI from '@/api/user/'

const state = {
  stockBalance: 0,
  orders: [],
  selected: false,
}

const getters = {
}

const mutations = {
  [types.CHANGE_MY] (state, { stockBalance, orders, selected }) {
    if (typeof stockBalance !== 'undefined') state.my.stockBalance = stockBalance;
    if (typeof orders !== 'undefined') state.my.orders = orders;
    if (typeof selected !== 'undefined') state.my.selected = selected;
    if (typeof wish_count !== 'undefined') state.my.wish_count = wish_count;
    if (typeof wish_limit !== 'undefined') state.my.wish_limit = wish_limit;
  },
}

const actions = {
  [types.RELOAD_MY] ({ commit, state, getters }) {
    stockAPI.getMyHolding(getters[types.CODE]).then(res => {
      commit(CHANGE_USER, {
        balance: res.balance,
        wish_count: res.wish_count,
        wish_limit: res.wish_limit,
      })
      commit(types.CHANGE_MY, {
        stockBalance: res.stock_balance,
        selected: res.selected,
      })
    })
    userAPI.getOrderList(getters[types.CODE], 'padding').then(res => {
      commit(types.CHANGE_MY, { orders: res.data })
    })
  },
  [types.SELECT] ({ commit, state, getters }) {
    stockAPI.postSelect(getters[types.CODE]).then(res => {
      commit(types.CHANGE_MY, {
        selected: true,
      })
    })
  },
  [types.DESELECT] ({ commit, state, getters }) {
    stockAPI.postDeselect(getters[types.CODE]).then(res => {
      commit(types.CHANGE_MY, {
        selected: false,
      })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
