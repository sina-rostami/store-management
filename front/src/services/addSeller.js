import apiService from './apiService'

const addSeller = async (data) => {
  try {
    const response = await apiService(
      { endpoint: '/seller', method: 'post', data, authTokenNeeded: true },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), error)
  }
}

export default addSeller
