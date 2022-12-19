import React from 'react'

import { Link } from 'react-router-dom'

import styles from './styles'

const SellerPanel = () => {
  const classes = styles()

  return (
    <div className={classes.sellerPanelRoot}>
      <div className={classes.sellerItem}><Link to='/bills'>مشاهده فاکتور‌های ثبت‌شده</Link></div>
      <div className={classes.sellerItem}><Link to='/products'>مدیریت محصولات</Link></div>
      <div className={classes.sellerItem}><Link to='/select-customer'>ثبت فروش</Link></div>
    </div>
  )
}

export default SellerPanel
