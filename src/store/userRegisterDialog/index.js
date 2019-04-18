import * as types from './types'

const state = {
  dialogVisable: false
}

const getters = {
}

const mutations = {
  [types.CHANGE_REGISTER_DIALOG_VISABLE] (state, visable) {
    state.dialogVisable = visable
  },
  [types.OPEN_REGISTER_DIALOG] (state) {
    state.dialogVisable = true
  },
  [types.CLOSE_REGISTER_DIALOG] (state) {
    state.dialogVisable = false
  },
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
