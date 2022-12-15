import apiService from './apiService'

const getProducts = async () => {
  try {
    const response = await apiService(
      { endpoint: '/product' },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getProducts
