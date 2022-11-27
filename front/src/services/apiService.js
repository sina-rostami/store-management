import axios from 'axios'

import { baseUrl } from './serviceAddress'

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
