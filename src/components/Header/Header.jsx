import React, { useContext } from 'react'
import './Header.css'

import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import { useNavigate } from 'react-router'

const Header = () => {
    const navigate=useNavigate()

    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const moveTosignIn=()=>{
        navigate('/login')
    }
    const logouthandle=()=>{
        setLoggedInUser({})
        navigate('/')
    }
   
    return (
        <header>
           
            <nav>
                <li><Link className="active" to="/shop">Shop</Link></li>
                <li><Link to="/review">Review</Link></li>
                <li><Link to="/inventory">Inventory</Link></li>
                {loggedInUser.isSignedIn?( <li><span  onClick={logouthandle}>LogOut</span></li>):( <li><span  onClick={moveTosignIn}>Sign In</span></li>)}
                
                {loggedInUser.isSignedIn && <li><img style={{height:"30px",objectFit:"cover",borderRadius:"50%"}} src={loggedInUser.photo} alt="" /></li>}
            </nav>
            
        </header>
    )
}

export default Header
