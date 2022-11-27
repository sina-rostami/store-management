import apiService from './apiService'

const submitOrder = async ({ data, method }) => {
  console.log(data, method)
  try {
    const response = await apiService(
      { url: 'http://65.21.114.82:5000/order', method, data },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default submitOrder
