import apiService from './apiService'

const signIn = async ({ data }) => {
  try {
    const response = await apiService(
      { endpoint: '/login', data, method: 'post' },
    )
    if (!response.data) return { succeeded: true }

    const result = { ...response.data, succeeded: true }

    return result
  } catch (error) {
    return (console.error(error), error)
  }
}

export default signIn
