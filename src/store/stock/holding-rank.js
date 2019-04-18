import * as types from './types'
import * as stockAPI from '@/api/stock/'

const state = {
  list: [],
}

const getters = {
}

const mutations = {
  [types.CHANGE_HOLDING_RANK] (state, { list }) {
    if (typeof list !== 'undefined')  state.holdingRank.list = list
  },
}

const actions = {
  [types.RELOAD_HOLDING_RANK] ({ commit, state, getters }) {
    stockAPI.getHoldingRank(getters[types.CODE]).then(res => {
      commit(types.CHANGE_HOLDING_RANK, { list: res.data })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
