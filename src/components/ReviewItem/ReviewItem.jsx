import React from 'react'
import './ReviewItem.css'

const ReviewItem = ({product,handleRemove}) => {
   
    return (
        <div className="review-container row  mt-3 ">
            <div className="col-md-3 text-center">

            <img className="review-img" src={product.img} alt="" />
            </div>
            <div className="col-md-9">

             <div className=" reviewcontent review">

           
           
            <h5>{product.name}</h5>
            <p>{product.quantity}</p>
            <p>{product.price}</p>
            <button onClick={()=>handleRemove(product)} className="main-button">Remove</button>
            
             </div>
            
          </div>
        </div>
    )
}

export default ReviewItem
