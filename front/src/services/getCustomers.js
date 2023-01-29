import apiService from './apiService'

const getCustomers = async (page) => {
  try {
    const response = await apiService(
      { endpoint: `/customer?page=${page}&per_page=${10}`, authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getCustomers
