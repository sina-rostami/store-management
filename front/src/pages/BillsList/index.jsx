import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './styles'

import getBills from '../../services/getBills.js'
import dltf from '../../utilities/dltf.js'

const BillsList = () => {
  const [bills, setBills] = useState(null)
  const classes = styles()
  const navigate = useNavigate()

  useEffect(() => {
    getBills().then(res => setBills(res.reverse()))
  }, [])

  return (
    <div className={classes.billsListRoot}>
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست فاکتور‌ها</h3>
      </div>
      <div className={classes.headerRow}>
        <div className={classes.indexHeader}><span>ردیف</span></div>
        <div className={classes.sellerHeader}><span>فروشنده</span></div>
        <div className={classes.customerHeader}><span>خریدار</span></div>
        <div className={classes.idHeader}><span>شناسه</span></div>
        <div className={classes.submitDateHeader}><span>تاریخ ثبت</span></div>
        <div className={classes.submitTimeHeader}><span>ساعت ثبت</span></div>
      </div>
      <div className={classes.billsContainer}>
        {bills=== null
          ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
          : (
            bills.length === 0
              ? <span className={classes.noItem}>موردی یافت نشد!</span>
              : (
                bills.map((bill, index) => (
                  <div className={classes.billRow} key={bill.id}>
                    <div className={classes.indexContainer}><span>{dltf(index + 1)}</span></div>
                    <div className={classes.sellerContainer}><span>{bill.seller_name}</span></div>
                    <div className={classes.customerContainer}><span>{bill.customer_name}</span></div>
                    <div className={classes.idContainer}><span>{dltf(bill.id)}</span></div>
                    <div className={classes.submitDateContainer}>
                      <span>
                        {Intl.DateTimeFormat('fa', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(bill.date * 1000)}
                      </span>
                    </div>
                    <div className={classes.submitTimeContainer}>
                      <span>
                        {Intl.DateTimeFormat('fa', {hour: '2-digit', minute: '2-digit',second: '2-digit' }).format(bill.date * 1000)}
                      </span>
                    </div>
                    <div className={classes.seeMoreContainer}>
                      <img onClick={() => navigate('/bill', {state:{ id: bill.id }})} src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
                    </div>
                  </div>
                ))
              )
          )
        }
      </div>
    </div>
  )
}

export default BillsList
