import * as types from './types'

const state = {
  dialogVisable: false,
}

const getters = {
}

const mutations = {
  [types.CHANGE_LOVE_DIALOG_VISABLE] (state, visable) {
    state.loveDialog.dialogVisable = visable
  },
  [types.OPEN_LOVE_DIALOG] (state) {
    state.loveDialog.dialogVisable = true;
  },
  [types.CLOSE_LOVE_DIALOG] (state) {
    state.loveDialog.dialogVisable = false
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
