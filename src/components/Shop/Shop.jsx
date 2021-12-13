import React, { useEffect, useState } from 'react'
import './shop.css'
import ShopItem from '../shopitem/ShopItem'
import Cart from '../cart/Cart'
import { Link } from 'react-router-dom'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/fakedb'

const Shop = () => {
    const [shops,setShop]=useState([])
    const [cart,setCart]=useState([])

    useEffect(()=>{
        fetch('https://secure-ocean-84970.herokuapp.com/products')
        .then(res=>res.json())
        .then(data=>setShop(data))
    },[])



    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productkeys=Object.keys(savedCart)

    //   if(shops.length){
    //     const previousCart=productkeys.map(pdkey=>{
    //         const product=shops.find(pd=>pd.key===pdkey)  
    //         product.quantity=savedCart[pdkey]
    //         return product
    //     })
    //     setCart(previousCart) 
    //   }
    fetch('https://secure-ocean-84970.herokuapp.com/productsbykeys',{
        method:'POST',
        headers:{ 'Content-type': 'application/json; charset=UTF-8'},
        body:JSON.stringify(productkeys)
    })
    .then(res=>res.json())
    .then(data=>setCart(data))

    },[shops])

    const addToCartHandle=(product)=>{
       const toBeAddedkey=product.key
       const sameProduct=cart.find(pd=>pd.key===toBeAddedkey)
       let count=1
       let newCart
       if(sameProduct){
           count=sameProduct.quantity+1 
           sameProduct.quantity=count
           const others=cart.filter(pd=>pd.key !==toBeAddedkey)
           newCart=[...others,sameProduct]
       }else{
           product.quantity=1
           newCart=[...cart,product]
       }


      
        setCart(newCart)
        
        addToDatabaseCart(product.key,count)
    }
   
    
    return (
        <div className="row ">
            <div className="col-md-9 shop-container ">
                {
                    shops.map(shop=>(
                       <ShopItem key={shop.key} showbtn={true} addToCartHandle={addToCartHandle} shop={shop} />
                    ))
                }
               
            </div>
            <div className="col-md-3">
                {cart.length>0?(<Cart cart={cart} >
                    <Link to="/review">
                    <button className="main-button">Review Button</button>
                    </Link>
                    </Cart>):(<div>Cart is Empty</div>)}
                
                
            </div>
            
        </div>
    )
}

export default Shop
