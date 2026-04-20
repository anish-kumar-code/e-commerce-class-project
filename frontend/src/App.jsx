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

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/product' element={<ProductDetailsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/wishlist' element={<WishlistPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/user' element={<UserProfile />} />




        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
