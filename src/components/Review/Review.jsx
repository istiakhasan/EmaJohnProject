import React, {useEffect, useState} from 'react'
import {getDatabaseCart, removeFromDatabaseCart} from '../../utilities/fakedb'
import ReviewItem from '../ReviewItem/ReviewItem'
import './Review.css'
import Cart from '../cart/Cart'
import {useNavigate} from 'react-router-dom';
import thankyouimg from '../../images/giphy.gif'
const Review = () => {
    const [cart, setCart] = useState([])
    const [orderplaced] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productkeys = Object.keys(savedCart)
    
        fetch('https://secure-ocean-84970.herokuapp.com/productsbykeys', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(productkeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))

        // const counts=Object.values(savedCart)    const
        // cartProducts=productkeys.map(key=>{        const
        // product=fakeData.find(pd=>pd.key===key)
        // product.quantity=savedCart[key]        return product    })
        // setCart(cartProducts)

    }, [])
    let thankyou
    if (orderplaced) {
        thankyou = <img src={thankyouimg} alt=""/>
    }
    const handleprocedcheckout = () => {
        navigate('/shipment')

    }
    const handleRemove = (product) => {
        setCart(cart.filter(pd => pd.key !== product.key))
        removeFromDatabaseCart(product.key)

    }
    return (
        <div className="container-fluid">

            <div className="row">
                <div
                    style={{
                        borderRight: "2px solid lightgray"
                    }}
                    className="col-md-9 p-3 ">

                    {
                        cart.map(
                            pd => (<ReviewItem handleRemove={handleRemove} key={pd.key} product={pd}/>)
                        )
                    }
                    {thankyou}
                </div>
                <div className="col-md-3">
                    <Cart handleplaceorder={handleprocedcheckout} cart={cart}>

                        <button onClick={handleprocedcheckout} className="main-button">proceed checkout</button>

                    </Cart>

                </div>

            </div>
        </div>
    )
}

export default Review
