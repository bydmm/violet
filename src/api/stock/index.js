import axios from 'axios'

const getList = (sort, keyword, page) => {
  return axios.get('/api/stocks', { params: { sort, keyword, page } }).then(res => res.data)
}

const getDetail = (code) => {
  return axios.get(`/api/stocks/${code}`).then(res => res.data)
}

const postLove = (code, cheerWord, lovePower, geetestResult) => {
  return axios
    .post(`/api/wishs`, {
      code: code,
      love_power: lovePower,
      cheer_word: cheerWord,
      geetest_challenge: geetestResult.geetest_challenge,
      geetest_seccode: geetestResult.geetest_seccode,
      geetest_validate: geetestResult.geetest_validate,
    })
    .then(res => res.data)
}

const postOrder = (code, price, amount, detail) => {
  return axios
    .post(`/api/orders`, { code, price, amount, detail })
    .then(res => res.data)
}

const postCancelOrder = (id) => {
  return axios
    .post(`/api/orders/${id}/cancel`)
    .then(res => res.data)
}

const postSelect = (code) => {
  return axios.post(`/api/stocks/${code}/select`).then(res => res.data)
}

const postDeselect = (code) => {
  return axios.post(`/api/stocks/${code}/deselect`).then(res => res.data)
}

const getMyHolding = (code) => {
  return axios.get(`/api/stocks/${code}/my`).then(res => res.data)
}

const getHoldingRank = (code) => {
  return axios.get(`/api/stocks/${code}/holding_rank`).then(res => res.data)
}

const getLoverList = (code) => {
  return axios.get(`/api/wishs`, { params: { code } }).then(res => res.data)
}

const getOrderList = (code, type, status) => {
  return axios.get(`/api/orders`, { params: { code, type, status } }).then(res => res.data)
}

const getDealList = (code) => {
  return axios.get(`/api/deals`, { params: { code } }).then(res => res.data)
}

const getTrendList = (code, trend_type, limit) => {
  return axios.get(`/api/trends`, { params: { code, trend_type, limit } }).then(res => res.data)
}

export {
  getList, getDetail, postLove,
  getLoverList, getMyHolding, getOrderList,
  postOrder, postCancelOrder,
  postSelect, postDeselect,
  getDealList, getTrendList, getHoldingRank
}
