import { useState } from 'react'
import { Button } from "@material-tailwind/react";
import Layout from './components/layout/Layout';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/Home";
import NoPage from "./pages/nopage/Nopage";
import Productinfo from './productinfo/Productinfo';
import ScrollTop from './components/scrolltop/Scrolltop';
import CartPage from './pages/cart/Cart';
import AllProduct from './pages/allproduct/Allproduct';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import UserDashboard from './pages/user/UserDashboard';
import AdminDashboard from './pages/admin/AdminDashBoard';
import AddProductPage from './pages/admin/AddProductPage';
import UpdateProductPage from './pages/admin/UpdateProductPage';
import MyState from "./context/myState";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import {Toaster} from 'react-hot-toast'
import CategoryPage from './pages/category/CategoryPage';
function App() {
  

  return (
    
      <MyState>
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productinfo/:id" element={<Productinfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allproduct" element={<AllProduct />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/category/:categoryname" element={<CategoryPage />} />
        <Route path="/userdashboard" element={
          
          <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
        <Route path="/admindashboard" element={ 
               <ProtectedRouteForAdmin>
               <AdminDashboard />
             </ProtectedRouteForAdmin>
         } />
        <Route path="/addproduct" element={ 
               <ProtectedRouteForAdmin>
               <AddProductPage />
             </ProtectedRouteForAdmin>
        } />
        <Route path="/updateproduct/:id" element={
          <ProtectedRouteForAdmin>
          <UpdateProductPage />
        </ProtectedRouteForAdmin>
          
          } />

        


        


        <Route path="/*" element={<NoPage />} />
        

      </Routes>
      <Toaster />
    </Router>
    </MyState>
  
  )
}

export default App
