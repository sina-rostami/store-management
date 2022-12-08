import React, { useState, useEffect } from 'react'

import styles from './styles'

const SellersList = () => {
  const [sellers, setSellers] = useState([])
  const classes = styles()

  useEffect(() => {
    setSellers([
      {
        id: 1,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 2,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 3,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 4,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 5,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 6,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 7,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 8,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 9,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 10,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 11,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
      {
        id: 12,
        name: 'کیوان رضایی',
        imageUri: '',
        entryDate: '1400/03/10',
      },
    ])
  }, [])

  return (
    <div className={classes.sellersListRoot}>
      <h3 className={classes.pageTitle}>لیست فروشندگان</h3>
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
