import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import getSellers from '../../services/getSellers.js'

import styles from './styles'
import dltf from '../../utilities/dltf.js'

const SellersList = () => {
  const [sellers, setSellers] = useState([])
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getSellers().then(res =>{
      if (Array.isArray(res)) {
        setSellers(res.reverse())
      }
    })
  }, [])

  return (
    <div className={classes.sellersListRoot}>
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست فروشندگان</h3>
      </div>
      <div className={classes.headerRow}>
        <div className={classes.indexHeader}><span>شماره</span></div>
        <div className={classes.imgHeader}><span>تصویر</span></div>
        <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
        <div className={classes.usernameHeader}><span>نام کاربری</span></div>
      </div>
      {sellers.length === 0
        ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
        : sellers.map((seller, index) => (
          <div className={classes.sellersRow} key={seller.id}>
            <div className={classes.indexContainer}><span>{dltf(index + 1)}</span></div>
            <div className={classes.imgContainer}>
              {seller.profile_photo_link
                ? <img src={seller.profile_photo_link} alt={seller.name} />
                : <div></div>
              }
            </div>
            <div className={classes.nameContainer}>
              <span>{seller.name}</span>
            </div>
            <div className={classes.usernameContainer}>
              <span>{seller.username}</span>
            </div>
            <div className={classes.seeMoreContainer} onClick={() => navigate('/edit-seller', { state: { id: seller.id } })}>
              <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SellersList
