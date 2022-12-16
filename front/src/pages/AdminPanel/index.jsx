import React from 'react'

import { Link } from 'react-router-dom'

import styles from './styles'

const AdminPanel = () => {
  const classes = styles()

  return (
    <div className={classes.adminPanelRoot}>
      <div className={classes.adminItem}><Link to='/sellers'>مدیریت فروشندگان</Link></div>
      <div className={classes.adminItem}><Link to='/customers'>مدیریت مشتری‌ها</Link></div>
      <div className={classes.adminItem}><Link to='/bills'>مشاهده فاکتور‌های ثبت‌شده</Link></div>
      <div className={classes.adminItem}><Link to='/products'>مدیریت محصولات</Link></div>
      <div className={classes.adminItem}><Link to='/ordering'>ثبت خرید</Link></div>
    </div>
  )
}

export default AdminPanel
