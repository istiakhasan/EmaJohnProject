import React from 'react'
import { Link } from 'react-router-dom'
import './ShopItem.css'

const ShopItem = ({shop,addToCartHandle,showbtn}) => {
    
    return (
        <div className="row mt-3 mx-3 shopcontainer  text-xs-center ">
            
            <div className="col-md-3 col-xs-12 text-xs-center col-sm-12 text-sm-center m-auto">
                <img className="img-fluid  " src={shop.img} alt={shop.name}/>
            </div>
            <div className="col-md-9 ">
            <div className="mx-3 shopitemdetails ">
                <p><Link to={"/product/"+shop.key}>{shop.name}</Link></p>
                <p> <b>${shop.price}</b></p>
                <p><small>Shipping price:{shop.shipping}</small></p>
                <p>Rating: {shop.star}</p>
                {
                    showbtn?(  <button onClick={()=>addToCartHandle(shop)} className="main-button">Add to Cart</button>):('')
                }
              
            </div>
            </div>

            
          
            
        </div>
    )
}

export default ShopItem
