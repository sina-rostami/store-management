import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import AuthGuard from './components/AuthGuard/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import { AuthProvider } from './context/index.js'
import AddProduct from './pages/AddProduct/index.jsx'
import AdminPanel from './pages/AdminPanel/index.jsx'
import BillsList from './pages/BillsList/index.jsx'
import CustomersList from './pages/CustomersList/index.jsx'
import CustomersMng from './pages/CustomersMng/index.jsx'
import NotFound from './pages/NotFound/index.jsx'
import Ordering from './pages/Ordering/index.jsx'
import Products from './pages/Products/index.jsx'
import SellerPanel from './pages/SellerPanel/index.jsx'
import SellersList from './pages/SellersList/index.jsx'
import SellersMng from './pages/SellersMng/index.jsx'
import SignIn from './pages/SignIn/index.jsx'

const App = () => {

  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route index path='/' element={<AuthGuard component={<Ordering />} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path='/customers-mng' element={<AuthGuard component={<CustomersMng />} />} />
        <Route path='/customers' element={<AuthGuard component={<CustomersList />} />} />
        <Route path='/sellers-mng' element={<AuthGuard adminGuard component={<SellersMng />} />} />
        <Route path='/sellers' element={<AuthGuard adminGuard component={<SellersList />} />} />
        <Route path='/bills' element={<AuthGuard component={<BillsList />} />} />
        <Route path='/products' element={<AuthGuard component={<Products />} />} />
        <Route path='/add-product' element={<AuthGuard component={<AddProduct />} />} />
        <Route path='/admin-panel' element={<AuthGuard adminGuard component={<AdminPanel />} />} />
        <Route path='/seller-panel' element={<AuthGuard sellerGuard component={<SellerPanel />} />} />
        <Route path='/ordering' element={<AuthGuard component={<Ordering />} />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
