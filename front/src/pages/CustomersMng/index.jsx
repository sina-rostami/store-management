import React from 'react'

import { Link } from 'react-router-dom'

import styles from './styles'

const CustomersMng = () => {
  const classes = styles()

  return (
    <div className={classes.customersMngRoot}>
      <div className={classes.customerItem}><Link to='/customers'>لیست مشتری‌ها</Link></div>
      <div className={classes.customerItem}><Link to='/add-customer'>افزودن مشتری</Link></div>
    </div>
  )
}

export default CustomersMng
