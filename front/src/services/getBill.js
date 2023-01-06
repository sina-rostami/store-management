import apiService from './apiService'

const getBills = async (id) => {
  try {
    const response = await apiService(
      { endpoint: `/order/${id}`, authTokenNeeded: true },
    )
    const result = response?.data || {}

    return result
  } catch (error) {
    return (console.error(error), error)
  }
}

export default getBills
