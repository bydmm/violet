import * as types from './types'
import * as stockAPI from '@/api/stock/'

const state = {
  list: [],
}

const getters = {
}

const mutations = {
  [types.CHANGE_LOVE_ACTIVITY] (state, { list }) {
    if (typeof list !== 'undefined')  state.loveActivity.list = list
  },
}

const actions = {
  [types.RELOAD_LOVE_ACTIVITY] ({ commit, state, getters }) {
    stockAPI.getLoverList(getters[types.CODE]).then(res => {
      commit(types.CHANGE_LOVE_ACTIVITY, { list: res.data })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
