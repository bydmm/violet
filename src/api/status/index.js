import axios from 'axios'

const getHard = () => {
  return axios.get(`/api/super_wishs`).then(res => res.data)
}

export { getHard }
