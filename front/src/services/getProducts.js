import apiService from './apiService'

const getProducts = async () => {
  try {
    const response = await apiService(
      { url: 'http://65.21.114.82:5000/product' },
    )
    const result = response?.data || []

    return result
  } catch (error) {
    return (console.error(error), [])
  }
}

export default getProducts
