import apiService from './apiService'

const getProducts = async (page, perPage = 10) => {
  try {
    const response = await apiService(
      { endpoint: `/product?page=${page}&per_page=${perPage}`, authTokenNeeded: true },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getProducts
