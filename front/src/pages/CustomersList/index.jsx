import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import getCustomers from '../../services/getCustomers'

import styles from './styles'

const CustomersList = () => {
  const [customers, setCustomers] = useState([])
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getCustomers().then(res =>{
      if (Array.isArray(res)) {
        setCustomers(res.reverse())
      }
    })
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
        <div className={classes.joinDateHeader}><span>تاریخ عضویت</span></div>
        <div className={classes.leaveDateHeader}><span>تاریخ ترخیص</span></div>
      </div>
      {customers.length === 0
        ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
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
            <div className={classes.joinDateContainer}>
              <span>
              {Intl.DateTimeFormat('fa', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(customer.join_date * 1000)}
              </span>
            </div>
            <div className={classes.leaveDateContainer}>
              <span>
              {customer.leave_date ? Intl.DateTimeFormat('fa', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(customer.leave_date * 1000) : '-'}
              </span>
            </div>
            <div className={classes.seeMoreContainer} onClick={() => navigate('/edit-customer', { state: { id: customer.id } })}>
              <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default CustomersList
