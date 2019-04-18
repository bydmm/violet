import * as types from './types'
import * as stockAPI from '@/api/stock/'

const state = {
  list: [],
}

const getters = {
}

const mutations = {
  [types.CHANGE_DEAL_ACTIVITY] (state, { list }) {
    if (typeof list !== 'undefined')  state.dealActivity.list = list
  },
}

const actions = {
  [types.RELOAD_DEAL_ACTIVITY] ({ commit, state, getters }) {
    stockAPI.getDealList(getters[types.CODE]).then(res => {
      commit(types.CHANGE_DEAL_ACTIVITY, { list: res.data })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
