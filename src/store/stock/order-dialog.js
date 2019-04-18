import * as types from './types'

const state = {
  dialogVisable: false,
}

const getters = {
}

const mutations = {
  [types.CHANGE_ORDER_DIALOG_VISABLE] (state, visable) {
    state.orderDialog.dialogVisable = visable
  },
  [types.OPEN_ORDER_DIALOG] (state) {
    state.orderDialog.dialogVisable = true;
  },
  [types.CLOSE_ORDER_DIALOG] (state) {
    state.orderDialog.dialogVisable = false
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
