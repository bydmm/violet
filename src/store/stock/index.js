import * as types from './types'
import * as stockAPI from '@/api/stock/'
import my from './my'
import loveActivity from './love-activity'
import loveDialog from './love-dialog'
import orderActivity from './order-activity'
import orderDialog from './order-dialog'
import dealActivity from './deal-activity'
import trendActivity from './trend-activity'
import holdingRank from './holding-rank'

const state = {
  code: '',
  name: '',
  avatar: '',
  tags: '',
  videoLink: '',
  musicLink: '',
  currentDanna: '',
  price: 0,
  priceDayOpen: 0,
  totalShare: 0,
  my: my.state,
  loveActivity: loveActivity.state,
  loveDialog: loveDialog.state,
  orderActivity: orderActivity.state,
  orderDialog: orderDialog.state,
  dealActivity: dealActivity.state,
  trendActivity: trendActivity.state,
  holdingRank: holdingRank.state,
}

const getters = {
  ...my.getters,
  ...loveActivity.getters,
  ...loveDialog.getters,
  ...orderActivity.getters,
  ...orderDialog.getters,
  ...dealActivity.getters,
  ...trendActivity.getters,
  ...holdingRank.getters,
  [types.CODE] (state, getters) {
    return state.code
  }
}

const mutations = {
  ...my.mutations,
  ...loveActivity.mutations,
  ...loveDialog.mutations,
  ...orderActivity.mutations,
  ...orderDialog.mutations,
  ...dealActivity.mutations,
  ...trendActivity.mutations,
  ...holdingRank.mutations,
  [types.CHANGE] (state, {
    code, name, avatar, tags,
    videoLink, musicLink, price,
    totalShare, priceDayOpen, currentDanna }) {
    if (typeof code !== 'undefined') state.code = code;
    if (typeof name !== 'undefined') state.name = name;
    if (typeof avatar !== 'undefined') state.avatar = avatar;
    if (typeof tags !== 'undefined') state.tags = tags;
    if (typeof videoLink !== 'undefined') state.videoLink = videoLink;
    if (typeof price !== 'undefined') state.price = price;
    if (typeof musicLink !== 'undefined') state.musicLink = musicLink;
    if (typeof priceDayOpen !== 'undefined') state.priceDayOpen = priceDayOpen;
    if (typeof totalShare !== 'undefined') state.totalShare = totalShare;
    if (typeof currentDanna !== 'undefined') state.currentDanna = currentDanna;
  },
  [types.CLEAR] (state) {
    state.code = '';
    state.name = '';
    state.avatar = '';
    state.tags = '';
    state.videoLink = '';
    state.price = '';
    state.musicLink = '';
    state.priceDayOpen = '';
    state.totalShare = '';
    state.currentDanna = '';
  },
}

const actions = {
  ...my.actions,
  ...loveActivity.actions,
  ...loveDialog.actions,
  ...orderActivity.actions,
  ...orderDialog.actions,
  ...dealActivity.actions,
  ...trendActivity.actions,
  ...holdingRank.actions,
  [types.RELOAD] ({ commit, state, getters }) {
    stockAPI.getDetail(getters[types.CODE]).then(res => {
      commit(types.CHANGE, {
        name: res.name,
        avatar: res.avatar,
        tags: res.tags,
        videoLink: res.video_link,
        musicLink: res.music_link,
        currentDanna: res.current_danna,
        price: res.price,
        priceDayOpen: res.price_day_open,
        totalShare: res.total_share,
      });
    })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}
