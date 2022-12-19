import apiService from './apiService'

const getSellerById = async ({ id }) => {
  try {
    const response = await apiService(
      { endpoint: `/seller/${id}`, authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getSellerById
