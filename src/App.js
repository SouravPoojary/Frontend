import "./App.css";

import React from "react";
import Navbar from "./Components/Navbar/Navbar"
import AdminPage from "./Pages/AdminPage"
import CustomerPage from "./Pages/CustomerPage";
import ServiceCenterPage from "./Pages/ServiceCenterPage"
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
// import BodyDesign from "./Components/Bodydesign/BodyDesign";



const App=()=> {
  return (
  
     
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
          <Route path="/admin" element={ <AdminPage /> } />
          <Route path="/customer" element={<CustomerPage />} />
        <Route path="/service-center" element={<ServiceCenterPage />}/>
        </Routes>
      </BrowserRouter>

   
  );
}

export default App;

