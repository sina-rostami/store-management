import apiService from './apiService'

const signIn = async ({ data }) => {
  try {
    const response = await apiService(
      { endpoint: '/login', data, method: 'post' },
    )
    const result = response?.data || {}

    return result
  } catch (error) {
    return (console.error(error), {})
  }
}

export default signIn
