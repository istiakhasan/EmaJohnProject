import React from 'react'
// import fakedata from '../../fakeData/products.json'

const Inventory = () => {
    const handleAddProduct=()=>{
        const product={}
        fetch('https://secure-ocean-84970.herokuapp.com/addProduct',{
            method:'POST',
            headers:{'Content-type': 'application/json; charset=UTF-8'},
            body:JSON.stringify(product)
        })

    }
    return (
        <div>
            <form action="">
                <p><span>Name</span><input type="text" /></p>
                <p><span>price:</span><input type="text" /></p>
                <p><span>Quantity</span><input type="text" /></p>
                <p><span>Product Image</span><input type="file" /></p>


            <button onClick={handleAddProduct}>Add product</button>
            </form>
            
        </div>
    )
}

export default Inventory
