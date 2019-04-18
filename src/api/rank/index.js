import axios from 'axios'

const getRank = () => {
  return axios.get(`/api/rank`).then(res => res.data)
}

export { getRank }
