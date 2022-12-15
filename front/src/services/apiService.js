import axios from 'axios'

// import { baseUrl } from './serviceAddress'
const baseUrl = 'http://192.168.0.121:5000'

function apiService ({ endpoint, url, method, data }) {
  const options = {
    method,
    url: encodeURI(url || `${baseUrl}${endpoint}`),
    data,
  }

  const responsePromise = axios(options)

  responsePromise.catch(err => {
    return err
  })

  return responsePromise
}

export default apiService
