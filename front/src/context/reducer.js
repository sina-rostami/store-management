export const initialAuthState = {
  authStatus: 'loading',
  role: '',
  userId: null,
  name: '',
  profilePictureUrl: null,
  username: '',
}

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
  case 'setName':
    return { ...state, name: action.payload }
  case 'setUsername':
    return { ...state, username: action.payload }
  case 'setProfilePictureUrl':
    return { ...state, profilePictureUrl: action.payload }
  default:
    throw new Error()
  }
}
