import React from 'react'
import './Cart.css'

const Cart = ({cart,children}) => {
    let total=0
    for(let i=0;i<cart.length;i++){
        const product=cart[i]
        total=total+product.price*product.quantity || 1
    }
    let shipping=12.99
    if(total>350){
        shipping=0
    }else if(total>150){
        shipping =6

    }else if(total>0){
        shipping=12.99
    }else{
        shipping =0
    }
    const tax=(total/10).toFixed(2)
    const grandtotal=(Number(total)+shipping+Number(tax)).toFixed(2)
    const formateNumber=num=>{
        const precision=num.toFixed(2)
        return Number(precision)
    }

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Item Ordered:{cart.length}</p>
            <p>product price: ${formateNumber(total)}</p>
            <p>Shipping cost: ${shipping}</p>
            <p>Tax cost: ${tax}</p>
            <p>Total price:${Number(grandtotal)}</p>
            <br />
            {
                children
            }
           
          
          

            
        </div>
    )
}

export default Cart
