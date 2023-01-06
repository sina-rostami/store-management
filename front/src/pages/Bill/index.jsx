import React, { useState, useEffect } from "react";
import styles from "./style";
import { useNavigate, useLocation } from 'react-router-dom'
import Cart from '../../components/Cart/index.jsx'
import getBill from '../../services/getBill.js'


function Bill (props) {
    
    const [bill, setBill] = useState(null)
    const classes = styles()
    const navigate = useNavigate()
    const location = useLocation()
    console.log(bill)

    useEffect(() => {
        getBill(location.state.id).then(res => setBill(res))
    },[])

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
            {/* <Cart /> */}
        </div>
        </div>
    )
}

export default Bill