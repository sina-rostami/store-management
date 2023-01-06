import React from 'react'

import { Link } from 'react-router-dom'

import styles from './styles'

const SellersMng = () => {
  const classes = styles()

  return (
    <div className={classes.sellersMngRoot}>
      <div className={classes.sellerItem}><Link to='/sellers'>لیست فروشندگان</Link></div>
      <div className={classes.sellerItem}><Link to='/add-seller'>افزودن فروشنده</Link></div>
    </div>
  )
}

export default SellersMng
