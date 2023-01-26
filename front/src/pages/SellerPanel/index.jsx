import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from './styles'
import { useAuthDispatch, useAuthState } from '../../context/index.js'
import getSellerInfo from '../../services/getSellerInfo.js'
import { useState } from 'react'

const SellerPanel = () => {
  const classes = styles()
  const [isSellerActive, setIsSellerActive] = useState(true)
  const { userId } = useAuthState()
  const authDispatch = useAuthDispatch()

  useEffect(() => {
    getSellerInfo(userId).then(res =>{
        authDispatch({ type: 'setName', payload: res.name })
        authDispatch({ type: 'setUsername', payload: res.username })
        authDispatch({ type: 'setProfilePictureUrl', payload: res.profile_photo_link })
        setIsSellerActive(res.is_active)
      }
    )
  }, [])

  return (
    <div className={classes.sellerPanelRoot}>
      <div className={classes.sellerItem}><Link to='/bills'>مشاهده فاکتور‌های ثبت‌شده</Link></div>
      {isSellerActive && (
        <>
          <div className={classes.sellerItem}><Link to='/products'>مدیریت محصولات</Link></div>
          <div className={classes.sellerItem}><Link to='/select-customer'>ثبت فروش</Link></div>
        </>
      )
      }
    </div>
  )
}

export default SellerPanel
