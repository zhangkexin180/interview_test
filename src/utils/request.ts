import axios from 'axios'
import { message } from 'antd';

const request = axios.create({
  baseURL: 'https://mock.com',
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      message.error(res.msg)
    } else {
      return res
    }
  },
  error => {
    message.error(error.message)
    return Promise.reject(error)
  }
)

export default request