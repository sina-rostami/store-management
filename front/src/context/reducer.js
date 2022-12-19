export const initialAuthState = { authStatus: 'loading', role: '', userId: null }

export function AuthReducer (state, action) {
  switch (action.type) {
  case 'login':
    return { ...state, authStatus: 'loggedIn' }
  case 'logout':
    return { ...state, authStatus: 'loggedOut', role: '' }
  case 'loading':
    return { ...state, authStatus: 'loading' }
  case 'setRole':
    return { ...state, role: action.payload }
  case 'setUserId':
    return { ...state, userId: action.payload }
  default:
    throw new Error()
  }
}
