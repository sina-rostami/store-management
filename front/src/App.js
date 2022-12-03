import React from 'react'

import { Routes, Route } from 'react-router-dom'

import Ordering from './components/Ordering/index.jsx'
import SignIn from './components/SignIn/index.jsx'

const App = () => {
  return (
    <Routes>
      <Route index path='/' element={<Ordering />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  )
}

export default App
