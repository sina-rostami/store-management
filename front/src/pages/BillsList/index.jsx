import React, { useState, useEffect } from 'react'

import styles from './styles'

const BillsList = () => {
  const [bills, setBills] = useState([])
  const classes = styles()

  useEffect(() => {
    setBills([
      {
        id: 1,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 2,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 3,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 4,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 5,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 6,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 7,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 8,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 9,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 10,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 11,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
      {
        id: 12,
        submitDate: '1400/03/10',
        sellerName: 'کبوان رضایی',
        customerName: 'سینا رستمی',
      },
    ])
  }, [])

  return (
    <div className={classes.billsListRoot}>
      <h3 className={classes.pageTitle}>لیست فاکتور ها</h3>
      <div className={classes.headerRow}>
        <div className={classes.indexHeader}><span>شماره</span></div>
        <div className={classes.sellerHeader}><span>فروشنده</span></div>
        <div className={classes.customerHeader}><span>خریدار</span></div>
        <div className={classes.idHeader}><span>شناسه</span></div>
        <div className={classes.submitDateHeader}><span>تاریخ ثبت</span></div>
      </div>
      {bills.length === 0
        ? <span>Loading ...</span>
        : bills.map((bill, index) => (
          <div className={classes.billRow} key={bill.id}>
            <div className={classes.indexContainer}><span>{index + 1}</span></div>
            <div className={classes.customerContainer}><span>{bill.customerName}</span></div>
            <div className={classes.sellerContainer}><span>{bill.sellerName}</span></div>
            <div className={classes.idContainer}><span>{bill.id}</span></div>
            <div className={classes.submitDateContainer}><span>{bill.submitDate}</span></div>
            <div className={classes.seeMoreContainer}>
              <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default BillsList
