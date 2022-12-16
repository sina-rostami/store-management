import apiService from './apiService'

const getBills = async () => {
  try {
    const response = await apiService(
      { endpoint: '/order', authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getBills
