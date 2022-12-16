import React from 'react'

import { Link } from 'react-router-dom'

import styles from './styles'

const AdminPanel = () => {
  const classes = styles()

  return (
    <div className={classes.adminPanelRoot}>
      <div className={classes.adminItem}><Link to='/sellers-mng'>مدیریت فروشندگان</Link></div>
      <div className={classes.adminItem}><Link to='/customers-mng'>مدیریت مشتری‌ها</Link></div>
      <div className={classes.adminItem}><Link to='/bills'>مشاهده فاکتور‌های ثبت‌شده</Link></div>
      <div className={classes.adminItem}><Link to='/products'>مدیریت محصولات</Link></div>
      <div className={classes.adminItem}><Link to='/ordering'>ثبت فروش</Link></div>
    </div>
  )
}

export default AdminPanel
