import React, { createContext, useContext, useReducer, useEffect } from 'react'

import { initialAuthState, AuthReducer } from './reducer'

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()

export function useAuthState () {
  const context = useContext(AuthStateContext)

  return context
}

export function useAuthDispatch () {
  const context = useContext(AuthDispatchContext)

  return context
}

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialAuthState)

  useEffect(() => {
    const authToken = localStorage.getItem('auth_token')
    const role = localStorage.getItem('role')
    if (authToken && role) {
      dispatch({ type: 'login' })
      dispatch({ type: 'setRole', payload: role })
    } else {
      dispatch({ type: 'logout' })
    }
  }, [])

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
