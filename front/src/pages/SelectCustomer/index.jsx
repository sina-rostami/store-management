import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import getCustomers from '../../services/getCustomers'

import styles from './styles'
import dltf from '../../utilities/dltf.js'

const SelectCustomer = () => {
  const [customers, setCustomers] = useState([])
  const [filteredCutomers, setFilteredCustomers] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getCustomers().then(res =>{
      if (Array.isArray(res)) {
        setCustomers(res.reverse())
      }
    })
  }, [])

  useEffect(() => {
    if (searchedText) {
      setFilteredCustomers(
        customers.filter(customer => customer.name.includes(searchedText))
      )
    } else {
      setFilteredCustomers(customers)
    }
  }, [searchedText, customers])

  const searchHandler = (e) => {
    setSearchedText(e.target.value)
  }

  return (
    <div className={classes.customersListRoot}>
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست مشتری‌ها</h3>
      </div>
      <input
        type="text"
        onChange={searchHandler}
        className={classes.search}
        placeholder='نام یا نام خانوادگی مشتری را وارد کنید ...'
      />
      <div className={classes.customersContainer}>
        {filteredCutomers.length !== 0 && (
            <div className={classes.headerRow}>
              <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
              <div className={classes.idHeader}><span>شناسه</span></div>
            </div>
          )
        }
        {customers.length === 0
          ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
          : (filteredCutomers.length === 0
              ? <span className={classes.noItem}>موردی یافت نشد!</span>
              : filteredCutomers.map(customer => (
                  <div className={classes.customerRow} key={customer.id}>
                    <div className={classes.nameContainer}>
                      <span>{customer.name}</span>
                    </div>
                    <div className={classes.idContainer}>
                      <span>{dltf(customer.id)}</span>
                    </div>
                    <div className={classes.seeMoreContainer} onClick={() => navigate('/ordering', { state: { id: customer.id } })}>
                      <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" />
                    </div>
                  </div>
                ))
              )
          }
      </div>
    </div>
  )
}

export default SelectCustomer
