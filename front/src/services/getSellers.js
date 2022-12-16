import apiService from './apiService'

const getSellers = async () => {
  try {
    const response = await apiService(
      { endpoint: '/seller', authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getSellers
