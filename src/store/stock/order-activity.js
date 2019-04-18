import * as types from './types'
import * as stockAPI from '@/api/stock/'

const state = {
  buyList: [],
  saleList: [],
}

const getters = {
}

const mutations = {
  [types.CHANGE_ORDER_ACTIVITY] (state, { saleList, buyList }) {
    if (typeof buyList !== 'undefined')  state.orderActivity.buyList = buyList
    if (typeof saleList !== 'undefined')  state.orderActivity.saleList = saleList
  },
}

const actions = {
  [types.RELOAD_ORDER_ACTIVITY] ({ commit, state, getters }) {
    stockAPI.getOrderList(getters[types.CODE], 'sale', 'padding').then(res => {
      commit(types.CHANGE_ORDER_ACTIVITY, { saleList: res.data, count: res.count })
    })
    stockAPI.getOrderList(getters[types.CODE], 'buy', 'padding').then(res => {
      commit(types.CHANGE_ORDER_ACTIVITY, { buyList: res.data, count: res.count })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
