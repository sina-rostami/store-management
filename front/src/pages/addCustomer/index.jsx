import React, { useState } from 'react'

import styles from './styles'

import addCustomer from '../../services/addCustomer.js'
import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const AddCustomer = () => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [credit, setCredit] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const changeHandler = (e, type) => {
    if (type === 'firstName') {
      setFirstName(e.target.value)
    } else if (type === 'lastName') {
      setLastName(e.target.value)
    } else if (type === 'credit') {
      setCredit(e.target.value)
    } else if (type === 'phoneNumber') {
      setPhoneNumber(e.target.value)
    }
  }

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!ثبت مشتری با موفقیت انجام شد', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else if (type === 'error') {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addCustomer({
      name: firstName + ' ' + lastName,
      credit: +credit,
      phone_number: phoneNumber,
    }).then(res =>{
      setIsLoading(false)
      if (res.succeeded) {
        showToastMessage('success')
        setFirstName('')
        setLastName('')
        setCredit('')
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
    <div className={classes.addCustomerRoot}>
      <h3 className={classes.pageTitle}>افزودن مشتری</h3>
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
          className={classes.creditInput}
          placeholder='اعتبار *'
          value={credit}
          onChange={e => changeHandler(e, 'credit')}
        />
        <input
          className={classes.phoneNumberInput}
          placeholder='شماره تلفن *'
          value={phoneNumber}
          onChange={e => changeHandler(e, 'phoneNumber')}
        />
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت مشتری'}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default AddCustomer
