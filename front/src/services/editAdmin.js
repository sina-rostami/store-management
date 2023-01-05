import apiService from './apiService'

const editSeller = async (data) => {
  try {
    const response = await apiService(
      { endpoint: '/admin', authTokenNeeded: true, method: 'put', data },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), false)
  }
}

export default editSeller
