import * as types from './types'
import each from 'lodash/each'
import moment from 'moment'

import * as stockAPI from '@/api/stock/'

const state = {
  labels: [],
  data: [],
  type: 'hour_close',
  typeLabels: {
    'day_close': '1D',
    'hour_close': '1H',
  },
  limit: 80,
}

const getters = {
  [types.TREND_DATA] (state, getters) {
    return state.trendActivity.data;
  },
  [types.TREND_LABELS] (state, getters) {
    return state.trendActivity.labels;
  },
  [types.TREND_LABEL_FOR_TYPE] (state, getters) {
    return state.trendActivity.typeLabels[state.trendActivity.type];
  },
  [types.TREND_TYPE] (state, getters) {
    return state.trendActivity.type;
  },
  [types.TREND_LIMIT] (state, getters) {
    return state.trendActivity.limit;
  },
  [types.TREND_FORMAT_FOR_TYPE] (state, getters) {
    if (state.trendActivity.type == 'day_close') {
      return 'YY/MM/DD'
    } else if (state.trendActivity.type == 'hour_close') {
      return 'MM/DD HH:mm'
    } else {

    }
  },
}

const mutations = {
  [types.CHANGE_TREND_ACTIVITY] (state, { data, labels, type }) {
    if (typeof data !== 'undefined')  state.trendActivity.data = data
    if (typeof labels !== 'undefined')  state.trendActivity.labels = labels
    if (typeof type !== 'undefined')  state.trendActivity.type = type
  },
}

const actions = {
  [types.RELOAD_TREND_ACTIVITY] ({ commit, state, getters }) {
    stockAPI.getTrendList(getters[types.CODE], getters[types.TREND_TYPE], getters[types.TREND_LIMIT]).then(res => {
      var labels = [];
      var data = [];
      each(res.data, (item) => {
        labels.push(moment(item.datetime).format(getters[types.TREND_FORMAT_FOR_TYPE]));
        data.push((item.price / 100.0).toFixed(2));
      });
      commit(types.CHANGE_TREND_ACTIVITY, { labels, data })
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
