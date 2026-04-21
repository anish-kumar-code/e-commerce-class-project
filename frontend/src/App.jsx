import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './website/pages/HomePage'
import ShopPage from './website/pages/ShopPage'
import ProductDetailsPage from './website/pages/ProductDetailsPage'
import CartPage from './website/pages/CartPage'
import WishlistPage from './website/pages/WishlistPage'
import LoginPage from './website/pages/LoginPage'
import SignupPage from './website/pages/SignupPage'
import UserProfile from './website/pages/UserProfile'
import CheckoutPage from './website/pages/CheckoutPage'
import ErrorPage from './website/pages/ErrorPage'
import Dashboard from './admin/pages/Dashboard'
import Login from './admin/pages/Login'
import AddProduct from './admin/pages/AddProduct'
import EditProduct from './admin/pages/EditProduct'
import AllProduct from './admin/pages/AllProduct'
import AdminLayout from './admin/components/AdminLayout'
import AddSlider from './admin/pages/AddSlider'
import AllSlider from './admin/pages/AllSlider'
import AddCategory from './admin/pages/AddCategory'
import AllCategory from './admin/pages/AllCategory'
import AddCoupon from './admin/pages/AddCoupon'
import AllCoupon from './admin/pages/AllCoupon'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product/:id' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/user' element={<UserProfile />} />



        <Route path='/admin/login' element={<Login />} />

        <Route path='/admin' element={<AdminLayout />}>

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit-product' element={<EditProduct />} />
          <Route path='all-product' element={<AllProduct />} />
          <Route path='add-slider' element={<AddSlider />} />
          <Route path='all-slider' element={<AllSlider />} />
          <Route path='add-category' element={<AddCategory />} />
          <Route path='all-category' element={<AllCategory />} />
          <Route path='add-coupon' element={<AddCoupon />} />
          <Route path='all-coupon' element={<AllCoupon />} />

        </Route>






        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
