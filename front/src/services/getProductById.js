import apiService from './apiService'

const getProductById = async ({ id }) => {
  try {
    const response = await apiService(
      { endpoint: `/product/${id}`, authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getProductById
