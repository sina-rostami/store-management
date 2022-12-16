import React, { useState } from 'react'

import styles from './styles'

import addSeller from '../../services/addSeller.js'

const AddSeller = () => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const changeHandler = (e, type) => {
    if (type === 'firstName') {
      setFirstName(e.target.value)
    } else if (type === 'lastName') {
      setLastName(e.target.value)
    } else if (type === 'phoneNumber') {
      setPhoneNumber(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addSeller({
      name: firstName + ' ' + lastName,
      phone_number: phoneNumber,
    }).then(res =>{
      setIsLoading(false)
      if (res.succeeded) {
        showToastMessage('success')
        setFirstName('')
        setLastName('')
        setPhoneNumber('')
      } else {
        const { message } = res.response.data

        // if (message === 'CREDIT_NOT_ENOUGH') {
        //   showToastMessage('error', '!موجودی حساب مشتری کافی نمی باشد')
        // }
      }
    })
  }

  return (
    <div className={classes.addSellerRoot}>
      <h3 className={classes.pageTitle}>افزودن فروشنده</h3>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes.firstNameInput}
          placeholder='نام *'
          value={firstName}
          onChange={e => changeHandler(e, 'firstName')}
        />
        <input
          className={classes.lastNameInput}
          placeholder='نام خانوادگی *'
          value={lastName}
          onChange={e => changeHandler(e, 'lastName')}
        />
        <input
          className={classes.phoneNumberInput}
          placeholder='شماره تلفن *'
          value={phoneNumber}
          onChange={e => changeHandler(e, 'phoneNumber')}
        />
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت فروشنده'}</button>
      </form>
    </div>
  )
}

export default AddSeller
