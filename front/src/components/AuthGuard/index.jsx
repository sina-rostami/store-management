import React from 'react'

import { useAuthState } from '../../context/index.js'
import NotFound from '../../pages/NotFound/index.jsx'
import Loading from '../Loading/index.jsx'

const AuthGuard = ({ component, adminGuard = false, sellerGuard = false }) => {
  const { authStatus, role } = useAuthState()

  if (role === 'seller' && adminGuard) {
    return <NotFound />
  }
  if (role === 'admin' && sellerGuard) {
    return <NotFound />
  }

  if (authStatus === 'loggedIn') {
    return component
  } else if (authStatus === 'loggedOut') {
    window.location.replace('/')
  }

  return <Loading />
}

export default AuthGuard
