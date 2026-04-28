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
import UserPage from './website/pages/UserPage'
import UserProfilePage from './website/pages/UserProfilePage'
import UserAddressPage from './website/pages/UserAddressPage'
import UserOrderPage from './website/pages/UserOrderPage'
import TrackOrderPage from './website/pages/TrackOrderPage'
import Orders from './admin/pages/Orders'
import OrderDetails from './admin/pages/OrderDetails'
import Users from './admin/pages/Users'
import UserDetails from './admin/pages/UserDetails'
import AdminProfile from './admin/pages/AdminProfile'
import ChangePassword from './admin/pages/ChangePassword'
import AdminLogs from './admin/pages/AdminLogs'
import AdminProductDetailsPage from './admin/pages/AdminProductDetailsPage'
import EditCategory from './admin/pages/EditCategory'
import EditCoupon from './admin/pages/EditCoupon'
import EditSlider from './admin/pages/EditSlider'

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
        {/* <Route path='/user' element={<UserProfile />} /> */}

        <Route path="/user" element={<UserPage />}>
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="address" element={<UserAddressPage />} />
          <Route path="orders" element={<UserOrderPage />} />
        </Route>
        <Route path="/track-order/:id" element={<TrackOrderPage />} />



        <Route path='/admin/login' element={<Login />} />

        <Route path='/admin' element={<AdminLayout />}>

          <Route path='dashboard' element={<Dashboard />} />
          <Route path='add-product' element={<AddProduct />} />
          <Route path='edit-product' element={<EditProduct />} />
          <Route path='all-product' element={<AllProduct />} />
          <Route path='product/:id' element={<AdminProductDetailsPage />} />

          <Route path='add-slider' element={<AddSlider />} />
          <Route path='all-slider' element={<AllSlider />} />
          <Route path='edit-slider' element={<EditSlider />} />

          <Route path='add-category' element={<AddCategory />} />
          <Route path='all-category' element={<AllCategory />} />
          <Route path='edit-category/:id' element={<EditCategory />} />

          <Route path='add-coupon' element={<AddCoupon />} />
          <Route path='all-coupon' element={<AllCoupon />} />
          <Route path='edit-coupon' element={<EditCoupon />} />

          <Route path='orders' element={<Orders />} />
          <Route path='order-details' element={<OrderDetails />} />
          <Route path='users' element={<Users />} />
          <Route path='user-details' element={<UserDetails />} />
          <Route path='profile' element={<AdminProfile />} />
          <Route path='change-password' element={<ChangePassword />} />
          <Route path='logs' element={<AdminLogs />} />

        </Route>






        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
