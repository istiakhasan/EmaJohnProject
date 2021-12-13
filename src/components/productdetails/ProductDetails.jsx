import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router'
// import fakeData from '../../fakeData/products.json'
import ShopItem from '../shopitem/ShopItem'

const ProductDetails = () => {
    const {productkey}=useParams()
    const [product,setProduct]=useState({})
    // const shop=fakeData.find(pd=>pd.key===productkey)
    useEffect(()=>{
        fetch('https://secure-ocean-84970.herokuapp.com/product/'+productkey)
        .then(res=>res.json())
        .then(data=>setProduct(data))
    },[productkey])
   
    return (
        <div>
            <div className="row">
                <div className="col-md-9">
                <ShopItem showbtn={false} shop={product} />

                </div>
            </div>

           
            
            
        </div>
    )
}

export default ProductDetails
