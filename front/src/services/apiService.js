import axios from 'axios'

// import { baseUrl } from './serviceAddress'
const baseUrl = 'http://127.0.0.1:5000'

function apiService ({ endpoint, url, method, data, authTokenNeeded, headers = {} }) {
  const options = {
    method,
    url: encodeURI(url || `${baseUrl}${endpoint}`),
    data,
    headers: { ...headers, ...(authTokenNeeded && { 'x-access-token': `${localStorage.getItem('auth_token')}` }) },
  }

  const responsePromise = axios(options)

  responsePromise.catch(err => {
    return err
  })

  return responsePromise
}

export default apiService
