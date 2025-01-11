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

function App() {
  

  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App
