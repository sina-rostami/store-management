import apiService from './apiService'

const editCredit = async ({ id, data}) => {
  try {
    const response = await apiService(
      { endpoint: `/balance/${id}`, authTokenNeeded: true, method: 'put', data },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), error)
  }
}

export default editCredit
