import React, { useState, useEffect } from "react";
import styles from "./style";
import { useNavigate, useLocation } from 'react-router-dom'
import Cart from '../../components/Cart/index.jsx'
import getBill from '../../services/getBill.js'
import getProducts from '../../services/getProducts.js'


function Bill (props) {
    const [products, setProducts] = useState([])
    const [bill, setBill] = useState(null)
    const classes = styles()
    const navigate = useNavigate()
    const location = useLocation()
    const [cartItems, setCartItems] = useState([])
    const handleCartItems = () => {
        if(bill){
            bill.products_ids.forEach(productId => {
                const cartItem = products.find(product => product.id === productId)
                console.log(cartItem)
                console.log(cartItems)
                // console.log([...cartItems,...cartItem])
                const temp = []
                temp.push(cartItem)
                setCartItems([...cartItems,...temp])
            });
        }

    }
    
    useEffect(() => {
        getProducts().then(res => setProducts(res))
        getBill(location.state.id).then(res => {
            setBill(res)
        })
    },[])
    useEffect(() => {
        if(bill){
            handleCartItems()
        }
    },[bill])
    return (
        <div className={classes.pageHeader}>
            <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
            <h3 className={classes.pageTitle}>فاکتور</h3>
        <div>
            <ul>
                <li className={classes.sellerName}>فروشنده</li>
                <li className={classes.customerName}>خریدار</li>
                <li className={classes.id}>شناسه خرید</li>
                <li className={classes.purchaseDate}>تاریخ خرید</li>
                <li className={classes.shoppingCart}>سبد خرید</li>
            </ul>
        {bill &&  cartItems.length === bill.products_ids.length && <Cart  totalPrice={bill.totalPrice} items={cartItems}/>}
        </div>
        </div>
    )
}

export default Bill