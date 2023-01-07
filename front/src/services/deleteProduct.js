import apiService from './apiService'

const deleteProduct = async (id) => {
  try {
    const response = await apiService(
      { endpoint: `/product/${id}`, method: 'delete', authTokenNeeded: true },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), error)
  }
}

export default deleteProduct
