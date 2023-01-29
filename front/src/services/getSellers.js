import apiService from './apiService'

const getSellers = async (page) => {
  try {
    const response = await apiService(
      { endpoint: `/seller?page=${page}&per_page=${11}`, authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getSellers
