import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import getCustomers from '../../services/getCustomers'

import styles from './styles'

const SelectCustomer = () => {
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
      <div className={classes.customersContainer}>
        <div className={classes.headerRow}>
          <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
          <div className={classes.idHeader}><span>شناسه</span></div>
        </div>
        {customers.length === 0
          ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
          : customers.map(customer => (
            <div className={classes.customerRow} key={customer.id}>
              <div className={classes.nameContainer}>
                <span>{customer.name}</span>
              </div>
              <div className={classes.idContainer}>
                <span>{customer.id}</span>
              </div>
              <div className={classes.seeMoreContainer} onClick={() => navigate('/ordering', { state: { id: customer.id } })}>
                <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default SelectCustomer
