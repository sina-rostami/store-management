import React, { useState, useEffect } from 'react'

import styles from './styles'

import editSeller from '../../services/editSeller.js'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useLocation, useNavigate } from 'react-router-dom'
import getSellerById from '../../services/getSellerById'


const EditSeller = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const classes = styles()

  useEffect(() => {
    getSellerById({ id: location.state.id }).then(res => {
      setFirstName(res.name.split(' ')[0])
      setLastName(res.name.split(' ')[1])
      setUsername(res.username)
      setPassword(res.password)
      setIsActive(res.is_active)
    })
  }, [])

  const changeHandler = (e, type) => {
    if (type === 'firstName') {
      setFirstName(e.target.value)
    } else if (type === 'lastName') {
      setLastName(e.target.value)
    } else if (type === 'password') {
      setPassword(e.target.value)
    } else if (type === 'username') {
      setUsername(e.target.value)
    } else if (type === 'isActive') {
      setIsActive(!isActive)
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
    editSeller({
      id: location.state.id,
      data: {
        name: firstName + ' ' + lastName,
        password,
        username,
        is_active: isActive,
      }
    }).then(res =>{
      setIsLoading(false)
      if (res.succeeded) {
        navigate('/sellers')
        showToastMessage('success')
        setFirstName('')
        setLastName('')
        setUsername('')
        setPassword('')
        setIsActive(false)
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
      <h3 className={classes.pageTitle}>ویرایش فروشنده</h3>
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
        <label
          className={classes.checkboxLabel}
        >
          فعال بودن
          <input
            type="checkbox"
            className={classes.checkboxInput}
            checked={isActive}
            onChange={e => changeHandler(e, 'isActive')}
          />
        </label>
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت'}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditSeller
