import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import getCustomers from '../../services/getCustomers'

import styles from './styles'

const CustomersList = () => {
  const [customers, setCustomers] = useState([])
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getCustomers().then(res => setCustomers(res))
  }, [])

  return (
    <div className={classes.customersListRoot}>
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست مشتری‌ها</h3>
      </div>
      <div className={classes.headerRow}>
        <div className={classes.indexHeader}><span>شماره</span></div>
        <div className={classes.imgHeader}><span>تصویر</span></div>
        <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
        <div className={classes.entryDateHeader}><span>تاریخ ورود</span></div>
      </div>
      {customers.length === 0
        ? <span>Loading ...</span>
        : customers.map((customer, index) => (
          <div className={classes.customerRow} key={customer.id}>
            <div className={classes.indexContainer}><span>{index + 1}</span></div>
            <div className={classes.imgContainer}>
              {customer.imageUri
                ? <img src="" alt="" />
                : <div></div>
              }
            </div>
            <div className={classes.nameContainer}>
              <span>{customer.name}</span>
            </div>
            <div className={classes.entryDateContainer}>
              <span>{customer.entryDate}</span>
            </div>
            <div className={classes.seeMoreContainer}>
              <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default CustomersList
