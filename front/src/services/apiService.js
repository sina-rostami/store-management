import axios from 'axios'

// import { baseUrl } from './serviceAddress'
// const baseUrl = 'http://192.168.0.121:5000'
const baseUrl = 'http://192.168.1.43:5000'


function apiService ({ endpoint, url, method, data, authTokenNeeded, isMultiPartData, headers = {} }) {
  const options = {
    method,
    url: encodeURI(url || `${baseUrl}${endpoint}`),
    data,
    headers: {
      ...headers,
      ...(authTokenNeeded && { 'x-access-token': `${localStorage.getItem('auth_token')}`}),
      ...(isMultiPartData && { 'Content-Type': 'multipart/form-data' })
    },
  }

  const responsePromise = axios(options)

  responsePromise.catch(err => {
    return err
  })

  return responsePromise
}

export default apiService
