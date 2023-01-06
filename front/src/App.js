import React from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'

import AuthGuard from './components/AuthGuard/index.jsx'
import Navbar from './components/Navbar/index.jsx'
import { AuthProvider } from './context/index.js'
import AddProduct from './pages/AddProduct/index.jsx'
import AddCustomer from './pages/AddCustomer/index.jsx'
import AddSeller from './pages/AddSeller/index.jsx'
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
import EditCustomer from './pages/EditCustomer/index.jsx'
import EditSeller from './pages/EditSeller/index.jsx'
import SelectCustomer from './pages/SelectCustomer/index.jsx'
import SignIn from './pages/SignIn/index.jsx'
import EditAdmin from './pages/EditAdmin/index.jsx'
import Bill from './pages/Bill/index.jsx'

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/customers-mng' element={<AuthGuard component={<CustomersMng />} />} />
        <Route path='/customers' element={<AuthGuard component={<CustomersList />} />} />
        <Route path='/select-customer' element={<AuthGuard component={<SelectCustomer />} />} />
        <Route path='/edit-customer' element={<AuthGuard component={<EditCustomer />} />} />
        <Route path='/sellers-mng' element={<AuthGuard adminGuard component={<SellersMng />} />} />
        <Route path='/sellers' element={<AuthGuard adminGuard component={<SellersList />} />} />
        <Route path='/edit-seller' element={<AuthGuard component={<EditSeller />} />} />
        <Route path='/bills' element={<AuthGuard component={<BillsList />} />} />
        <Route path='/products' element={<AuthGuard component={<Products />} />} />
        <Route path='/add-product' element={<AuthGuard component={<AddProduct />} />} />
        <Route path='/add-customer' element={<AuthGuard component={<AddCustomer />} />} />
        <Route path='/add-seller' element={<AuthGuard component={<AddSeller />} />} />
        <Route path='/admin-panel' element={<AuthGuard adminGuard component={<AdminPanel />} />} />
        <Route path='/seller-panel' element={<AuthGuard sellerGuard component={<SellerPanel />} />} />
        <Route path='/ordering' element={<AuthGuard component={<Ordering />} />} />
        <Route path='/edit-admin' element={<AuthGuard component={<EditAdmin />} />} />
        <Route path='/bill' element={<AuthGuard component={<Bill/>} />} />
        <Route path='/not-found' element={<NotFound />} />
        <Route path='*' element={<Navigate to='/not-found' />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
