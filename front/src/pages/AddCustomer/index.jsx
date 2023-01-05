import React, { useState } from 'react'

import styles from './styles'

import addCustomer from '../../services/addCustomer.js'
import { ToastContainer, toast } from 'react-toastify'
import isNaN from 'lodash/isNaN'

import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../components/ImageUpload/index.jsx'
import { phoneNumberPattern } from '../../constants/regex.js'

const AddCustomer = () => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [credit, setCredit] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate('')

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
      toast.success('!افزودن مشتری با موفقیت انجام شد', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false,
      })
    } else if (type === 'error') {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable: false,
      })
    }
  }

  const checkIsFormValid = () => {
    if (isNaN(Number(credit))) {
      showToastMessage('error', 'مقدار اعتبار باید عدد باشد!')

      return false
    }

    if (!phoneNumberPattern.test(phoneNumber)) {
      showToastMessage('error', 'تلفن همراه معتبر نمی‌باشد!')

      return false
    }

    return true
  }

  const checkIsFormFilled = () => {
    const emptyInputs = []

    if (!firstName) {
      emptyInputs.push('نام')
    }
    if (!lastName) {
      emptyInputs.push('نام خانوادگی')
    }
    if (!credit) {
      emptyInputs.push('اعتبار')
    }
    if (!phoneNumber) {
      emptyInputs.push('تلفن همراه')
    }

    if (emptyInputs.length !== 0) {
      showToastMessage('error', `${emptyInputs.join(' و ')} را وارد کنید!`)

      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (checkIsFormFilled() && checkIsFormValid()) {
      setIsLoading(true)
      addCustomer({
        name: firstName + ' ' + lastName,
        credit: +credit,
        phone_number: phoneNumber,
      }).then(res =>{
        setIsLoading(false)
        if (res.succeeded) {
          navigate('/customers')
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
  }

  return (
    <div className={classes.addCustomerRoot}>
      <ToastContainer rtl />
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
          placeholder='تلفن همراه *'
          value={phoneNumber}
          onChange={e => changeHandler(e, 'phoneNumber')}
        />
        <ImageUpload />
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت مشتری'}</button>
      </form>
    </div>
  )
}

export default AddCustomer
