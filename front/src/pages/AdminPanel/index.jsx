import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../../context/index.js'
import styles from './styles'
import getSellerInfo from '../../services/getSellerInfo.js'

const AdminPanel = () => {
  const classes = styles()
  const { userId } = useAuthState()
  const authDispatch = useAuthDispatch()

  useEffect(() => {
    getSellerInfo(userId).then(res =>{
        authDispatch({ type: 'setName', payload: res.name })
        authDispatch({ type: 'setUsername', payload: res.username })
        authDispatch({ type: 'setProfilePictureUrl', payload: res.profile_photo_link })
      }
    )
  }, [])

  return (
    <div className={classes.adminPanelRoot}>
      <div className={classes.adminItem}><Link to='/sellers-mng'>مدیریت فروشندگان</Link></div>
      <div className={classes.adminItem}><Link to='/customers-mng'>مدیریت مشتری‌ها</Link></div>
      <div className={classes.adminItem}><Link to='/bills'>مشاهده فاکتور‌های ثبت‌شده</Link></div>
      <div className={classes.adminItem}><Link to='/products'>مدیریت محصولات</Link></div>
      <div className={classes.adminItem}><Link to='/select-customer'>ثبت فروش</Link></div>
      {/* <div className={classes.adminItem}><Link to='/credit'>افزایش اعتبار</Link></div> */}
    </div>
  )
}

export default AdminPanel
