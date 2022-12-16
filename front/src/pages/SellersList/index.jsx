import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import getSellers from '../../services/getSellers.js'

import styles from './styles'

const SellersList = () => {
  const [sellers, setSellers] = useState([])
  const classes = styles()
  const navigate = useNavigate()

  useEffect(() => {
    getSellers().then(res => setSellers(res))
  }, [])

  return (
    <div className={classes.sellersListRoot}>
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست فروشندگان</h3>
      </div>
      <div className={classes.headerRow}>
        <div className={classes.indexHeader}><span>شماره</span></div>
        <div className={classes.imgHeader}><span>عکس</span></div>
        <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
        <div className={classes.entryDateHeader}><span>تاریخ ورود</span></div>
      </div>
      {sellers.length === 0
        ? <span>Loading ...</span>
        : sellers.map((seller, index) => (
          <div className={classes.sellersRow} key={seller.id}>
            <div className={classes.indexContainer}><span>{index + 1}</span></div>
            <div className={classes.imgContainer}>
              {seller.imageUri
                ? <img src="" alt="" />
                : <div></div>
              }
            </div>
            <div className={classes.nameContainer}>
              <span>{seller.name}</span>
            </div>
            <div className={classes.entryDateContainer}>
              <span>{seller.entryDate}</span>
            </div>
            <div className={classes.seeMoreContainer}>
              <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SellersList
