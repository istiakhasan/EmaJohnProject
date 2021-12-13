// import React, { useContext } from 'react'
// import {
   
   
//     Route,
 
//     Navigate,
    
 
//   } from "react-router-dom";
// import { UserContext } from '../../App';

// const PrivateRoute = ({children,...rest}) => {
//     const [logedInUser]=useContext(UserContext)
//     return (
//         <Route
//         {...rest}
//         render={({ location }) =>
//           logedInUser.email ? (
//             children
//           ) : (
//             <Navigate
//               to={{
//                 pathname: "/login",
//                 state: { from: location }
//               }}
//             />
//           )
//         }
//       />
//     )
// }

// export default PrivateRoute



import { useContext } from 'react';
import { Navigate,  useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
// import Shipment from '../Shipment/Shipment';

const PrivateRoute = ({ children,...rest }) => {
  let location = useLocation();

   const [loggedInUser]=useContext(UserContext)
   



  if (!loggedInUser.email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }else{
    

    return children;
  }

};

export default PrivateRoute;
