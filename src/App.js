
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Review from './components/Review/Review';
import Error from './components/Error/Error';
import ProductDetails from './components/productdetails/ProductDetails';
import Shipment from './components/Shipment/Shipment';
import Login from './components/Login/Login';
import { createContext, useEffect, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Inventory from './components/Inventory/Inventory';



export const UserContext=createContext()
const getUserinfolS=()=>{
  const data=localStorage.getItem('logininfo')
  if(data){
    return JSON.parse(data)
  }else{
    return []
  }
}

function App() {


  const [loggedInUser,setLoggedInUser]=useState(getUserinfolS())
  useEffect(()=>{
    localStorage.setItem('logininfo',JSON.stringify(loggedInUser))
  })
  return (
    <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
     

    <div className="container-fluid" >
      
      <Router>
      <Header />
        <Routes>
          <Route exact path="/shop" element={<Shop />}></Route>
          <Route exact path="/" element={<Shop />}></Route>
          
          {/* <Route path="/inventory" element={<Inventory />}></Route> */}
       
          <Route
         path="/shipment"
         element={
          <PrivateRoute>
            <Shipment />
          </PrivateRoute>
        }
        />
       
          <Route path="/review" element={<Review />}></Route>
        
       

        
        <Route
         path="/inventory"
         element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        }
        />

        
          
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/product/:productkey" element={<ProductDetails />}></Route>
          <Route path="*" element={<Error />}></Route>
        </Routes>
      </Router>
       
    

    </div>
    </UserContext.Provider>
  );
}

export default App;
