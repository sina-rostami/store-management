import apiService from './apiService'

const getCustomers = async () => {
  try {
    const response = await apiService(
      { endpoint: '/customer', authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getCustomers
