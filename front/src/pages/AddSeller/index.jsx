import React, { useState } from 'react'

import styles from './styles'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import addSeller from '../../services/addSeller.js'
import { useNavigate } from 'react-router-dom'

const AddSeller = () => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const changeHandler = (e, type) => {
    if (type === 'firstName') {
      setFirstName(e.target.value)
    } else if (type === 'lastName') {
      setLastName(e.target.value)
    } else if (type === 'password') {
      setPassword(e.target.value)
    } else if (type === 'username') {
      setUsername(e.target.value)
    }
  }

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!ثبت سفارش با موفقیت انجام شد', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else if (type === 'error') {
      console.log(type, message)
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addSeller({
      name: firstName + ' ' + lastName,
      username,
      password,
    }).then(res =>{
      setIsLoading(false)
      if (res.succeeded) {
        navigate('/sellers')
        showToastMessage('success')
        setFirstName('')
        setLastName('')
        setUsername('')
        setPassword('')
      } else {
        const { message } = res.response.data

        if (message === 'ALREADY_EXISTS') {
          showToastMessage('error', '!این کاربر قبلا ثبت شده است')
        }
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
          className={classes.usernameInput}
          placeholder='نام کاربری *'
          value={username}
          onChange={e => changeHandler(e, 'username')}
        />
        <input
          className={classes.passwordInput}
          placeholder='رمز عبور *'
          value={password}
          type='password'
          onChange={e => changeHandler(e, 'password')}
        />
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت فروشنده'}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default AddSeller
