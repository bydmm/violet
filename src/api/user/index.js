import axios from 'axios'

const getGeeTestRegister = () => {
  return axios.get(`/api/geetest`).then(res => res.data)
}

const loginPost = (postData) => {
  return axios.post(`/api/users/login`, postData).then(res => res.data)
}

const logoutPost = () => {
  return axios.post(`/api/users/logout`).then(res => res.data)
}

const registerPost = (postData) => {
  return axios.post(`/api/users`, postData).then(res => res.data)
}

const getUser = () => {
  return axios.get(`/api/user`).then(res => res.data)
}

const getProfile = () => {
  return axios.get(`/api/profile`).then(res => res.data)
}

const getDeals = (page) => {
  return axios.get(`/api/deals/my?page=${page}`).then(res => res.data)
}

const setToken = (token) => {
  axios.defaults.headers.common['X-token'] = token;
}

const getOrderList = (code, status, page) => {
  return axios.get(`/api/orders/my`, { params: { code, status, page } }).then(res => res.data)
}

export {
  loginPost, registerPost, getUser, setToken,
  getGeeTestRegister, getDeals, getProfile, logoutPost, getOrderList
}
