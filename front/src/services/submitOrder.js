import apiService from './apiService'

const submitOrder = async ({ data, method }) => {
  try {
    const response = await apiService(
      { endpoint: '/order', method, data, authTokenNeeded: true },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default submitOrder
