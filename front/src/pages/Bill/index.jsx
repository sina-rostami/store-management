import React from "react";
import styles from "./style";
import { useNavigate } from 'react-router-dom'

function Bill (props) {
    const classes = styles()
    const navigate = useNavigate()

    return (
        <div className={classes.pageHeader}>
            <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
            <h3 className={classes.pageTitle}>فاکتور</h3>
        <div>
            <ul>
                <h4 className={classes.sellerName}>فروشنده</h4>
                <h4 className={classes.customerName}>خریدار</h4>
                <h4 className={classes.id}>شناسه خرید</h4>
                <h4 className={classes.purchaseDate}>تاریخ خرید</h4>
                <h4 className={classes.shoppingCart}>سبد خرید</h4>
            </ul>
        </div>
        </div>
    )
}

export default Bill