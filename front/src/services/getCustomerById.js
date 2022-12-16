import apiService from './apiService'

const getCustomerById = async ({ id }) => {
  try {
    const response = await apiService(
      { endpoint: `/customer/${id}`, authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getCustomerById
