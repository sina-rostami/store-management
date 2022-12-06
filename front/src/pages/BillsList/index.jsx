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
      },
    ])
  }, [])

  return (
    <div className={classes.billsListRoot}>
      <h3 className={classes.pageTitle}>لیست فاکتور ها</h3>
      {bills.length === 0
        ? <span>Loading ...</span>
        : bills.map((bill, index) => (
          <div className={classes.billRow} key={bill.id}>
            <div className={classes.indexContainer}><span>{index + 1}</span></div>
            <div className={classes.imgContainer}>
              {bill.imageUri
                ? <img src="" alt="" />
                : <div></div>
              }
            </div>
            <div className={classes.nameContainer}>
              <span>{bill.name}</span>
            </div>
            <div className={classes.submitDateContainer}>
              <span>{bill.submitDate}</span>
            </div>
            <div className={classes.seeMoreContainer}>
              <img src="./asset/images/chevron-left.png" alt="" />
            </div>
          </div>
        ))}
    </div>
  )
}

export default BillsList
