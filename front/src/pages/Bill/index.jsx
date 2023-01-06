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
        </div>
    )
}

export default Bill