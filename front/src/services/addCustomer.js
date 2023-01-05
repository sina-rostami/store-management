import apiService from './apiService'

const addCustomer = async (data) => {
  try {
    const response = await apiService(
      { endpoint: '/customer', method: 'post', data, authTokenNeeded: true, isMultiPartData: true },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), error)
  }
}

export default addCustomer
