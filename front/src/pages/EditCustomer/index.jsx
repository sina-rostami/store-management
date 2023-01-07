import React, { useEffect, useState } from 'react'
import styles from './styles'
import editCustomer from '../../services/editCustomer.js'
import { ToastContainer, toast } from 'react-toastify'
import isNaN from 'lodash/isNaN'
import 'react-toastify/dist/ReactToastify.css'
import { useLocation, useNavigate } from 'react-router-dom'
import getCustomerById from '../../services/getCustomerById'
import { phoneNumberPattern, namePattern } from '../../constants/regex.js'
import ImageUpload from '../../components/ImageUpload/index.jsx'
import dftl from '../../utilities/dftl.js'

const EditCustomer = (props) => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [credit, setCredit] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedImg, setSelectedImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getCustomerById({ id: location.state.id }).then(res => {
      setFirstName(res.name.split(' ')[0])
      setLastName(res.name.split(' ')[1])
      setCredit(res.credit)
      setPhoneNumber(res.phone_number)
    })
  }, [])

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
      toast.success('!ویرایش مشتری با موفقیت انجام شد', {
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
    if (!namePattern.test(firstName)) {
      showToastMessage('error', 'طول نام باید بین ۲ تا ۱۵ کاراکتر باشد')

      return false
    }

    if (!namePattern.test(lastName)) {
      showToastMessage('error', 'طول نام خانوادگی باید بین ۲ تا ۱۵ کاراکتر باشد')

      return false
    }

    if (isNaN(Number(dftl(credit)))) {
      showToastMessage('error', 'مقدار اعتبار باید عدد باشد!')

      return false
    }

    if (!phoneNumberPattern.test(dftl(phoneNumber))) {
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
    if (!credit.toString()) {
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
      const formData = new FormData()
      formData.append('file', selectedImg)
      formData.append('id', location.state.id)
      formData.append('name', firstName + ' ' + lastName)
      formData.append('credit', +dftl(credit))
      formData.append('phone_number', dftl(phoneNumber))
      editCustomer({ id: location.state.id, data: formData })
      .then(res => {
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
          console.log(message)

          if (message === 'INVALID_TOKEN') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('role')
            authDispatch({ type: 'logout' })
          }
          if (message === 'ALREADY_EXISTS') {
            showToastMessage('error', 'این مشتری قبلا ثبت شده است')
          }
        }
      })
    }
  }

  return (
    <div className={classes.editCustomerRoot}>
      <ToastContainer rtl />
      <h3 className={classes.pageTitle}>ویرایش مشتری</h3>
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
        <img src="" alt="" />
        <ImageUpload setImage={setSelectedImg} />
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت'}</button>
      </form>
    </div>
  )
}

export default EditCustomer
