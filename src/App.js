 import "./App.css";
import React from "react";
// import Navbarsc from "./Components/NavbarSC/Navbarsc";
//  import  Navbar  from './Components/Navbar/Navbar'
// import Navbaram from './Components/NavbarAM/Navbaram'
import Navbarcm from './Components/NavbarCM/Navbarcm'
// import { Route,  Routes } from "react-router-dom";
const App=()=> {
  return (
    <div>
      {/* <Navbarsc /> */}
      {/* <BrowserRouter> */}
        {/* <Navbar /> */}
        {/* <Routes>
          <Route path="/admin" element={<Navbaram />} />
          <Route path="/customer" element={<Navbarcm />} />
          <Route path="/service-center" element={<Navbarsc/>}/>
        </Routes> */}
      {/* </BrowserRouter> */}

      <Navbarcm/>
      {/* <Navbaram/> */}
     </div>
  );
}

export default App;
