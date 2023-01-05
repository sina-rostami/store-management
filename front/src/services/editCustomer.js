import apiService from './apiService'

const editCustomerById = async ({ id, data }) => {
  try {
    const response = await apiService(
      { endpoint: `/customer/${id}`, authTokenNeeded: true, method: 'put', data, isMultiPartData: true },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), false)
  }
}

export default editCustomerById
