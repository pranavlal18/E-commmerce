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
function App() {
  

  return (
    <div>
    <Router>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/productinfo" element={<Productinfo />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/allproduct" element={<AllProduct />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />


        <Route path="/*" element={<NoPage />} />

      </Routes>
    </Router>
  </div>
  )
}

export default App
