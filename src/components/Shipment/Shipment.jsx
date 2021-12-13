import React, {useContext} from 'react'
import {useForm} from "react-hook-form";
import {UserContext} from '../../App';
import {getDatabaseCart, processOrder} from '../../utilities/fakedb';
import './Shipment.css'

const Shipment = () => {

    const {register, handleSubmit,  formState: {
            errors
        }} = useForm();
    const onSubmit = data => {
       
        const savedCart = getDatabaseCart()
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            shipment: data,
            orderTime: new Date()
        }
        fetch('https://secure-ocean-84970.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert('Your order placed successfully')
                }
            })
    }
    const [loggedInUser] = useContext(UserContext)

    // console.log(watch("example")); // watch input value by passing the name of it

    return (

        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input
                defaultValue={loggedInUser.name}
                name="name"
                {...register("name", { required: true })}/> {errors.name && <span className="error">Name field is required</span>}

            <input
                defaultValue={loggedInUser.email}
                name="email"
                {...register("email", { required: true })}/> {errors.email && <span className="error">Email field is required</span>}

            <input
                placeholder="Enter your address..."
                name="address"
                {...register("address", { required: true })}/> {errors.address && <span className="error">Address field is required</span>}

            <input
                placeholder="Enter your phone...."
                name="phone"
                {...register("phone", { required: true })}/> {errors.phone && <span className="error">Phone field is required</span>}

            <input type="submit"/>
        </form>
    );

}

export default Shipment
