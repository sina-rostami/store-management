import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import Ordering from './components/Ordering/index.jsx'
import AdminPanel from './pages/AdminPanel/index.jsx'
import BillsList from './pages/BillsList/index.jsx'
import CustomersList from './pages/CustomersList/index.jsx'
import NotFound from './pages/NotFound/index.jsx'
import SellersList from './pages/SellersList/index.jsx'
import SignIn from './pages/SignIn/index.jsx'

const App = () => {
  return (
    <Routes>
      <Route index path='/' element={<Ordering />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path='/customers' element={<CustomersList />} />
      <Route path='/sellers' element={<SellersList />} />
      <Route path='/bills' element={<BillsList />} />
      <Route path='/admin-panel' element={<AdminPanel />} />
      <Route path='/not-found' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
  )
}

export default App
