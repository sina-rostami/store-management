import React, { useState } from 'react'

import styles from './styles'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import editAdmin from '../../services/editAdmin.js'
import { useNavigate, useLocation } from 'react-router-dom'

import { passwordPattern, usernamePattern } from '../../constants/regex.js'
import { useAuthDispatch } from '../../context/index.js'

const EditAdmin = () => {
  const classes = styles()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const authDispatch = useAuthDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState(location.state.username)

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!تغییر رمزعبور با موفقیت انجام شد', {
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

  const changeHandler = (e, type) => {
    if (type === 'username') {
      setUsername(e.target.value)
    } else if (type === 'oldPassword') {
      setOldPassword(e.target.value)
    } else if (type === 'newPassword') {
      setNewPassword(e.target.value)
    } else if (type === 'confirmPassword') {
      setConfirmPassword(e.target.value)
    }
  }

  const checkIsFormValid = () => {
    if (!usernamePattern.test(username)) {
      showToastMessage('error', 'طول نام کاربری باید بین ۴ تا ۱۵ کاراکتر باشد')

      return false
    }

    if (!passwordPattern.test(newPassword)) {
      showToastMessage('error', 'رمز عبور باید شامل حروف انگلیسی بزرگ و کوچک، عدد و کاراکتر خاص باشد')

      return false
    }

    if (newPassword === oldPassword) {
      showToastMessage('error', 'رمز عبور قدیمی و رمز عبور جدید یکسان می باشند')

      return false
    }

    if (newPassword !== confirmPassword) {
      showToastMessage('error', 'رمز عبور جدید و تایید رمز عبور یکسان نمی باشند')

      return false
    }

    return true
  }

  const checkIsFormFilled = () => {
    const emptyInputs = []

    if (!username) {
      emptyInputs.push('نام کاربری جدید')
    }
    if (!oldPassword) {
      emptyInputs.push('رمز عبور قدیمی')
    }
    if (!newPassword) {
      emptyInputs.push('رمز عبور جدید')
    }
    if (!confirmPassword) {
      emptyInputs.push('تایید رمز عبور جدید')
    }

    if (emptyInputs.length !== 0) {
      showToastMessage('error', `${emptyInputs.join(' و ')} را وارد کنید`)

      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(checkIsFormFilled() && checkIsFormValid()) {
      setIsLoading(true)
      editAdmin({
        username,
        new_password: newPassword,
        old_password: oldPassword,
        confirm_new_password: confirmPassword,
      }).then(res => {
        setIsLoading(false)
        if (res.succeeded) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('role')
          localStorage.removeItem('user_id')
          authDispatch({ type: 'logout' })
          authDispatch({ type: 'setRole', payload: '' })
          authDispatch({ type: 'setUserId', payload: null })
          navigate('/')
          showToastMessage('success')
          setUsername('')
          setOldPassword('')
          setNewPassword('')
          setConfirmPassword('')
        } else {
          const { message } = res.response.data // handle error messages here

          if (message === 'INVALID_TOKEN') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('role')
            authDispatch({ type: 'logout' })
          }
          if (message === 'WRONG_PASSWORD') {
            showToastMessage('error', 'رمز عبور قدیمی اشتباه است')
          }
        }
      })
    }
  }

  return (
    <div className={classes.addSellerRoot}>
      <h3 className={classes.pageTitle}>ویرایش اطلاعات ادمین</h3>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes.firstNameInput}
          placeholder='نام کاربری جدید *'
          value={username}
          onChange={e => changeHandler(e, 'username')}
        />
        <input
          className={classes.lastNameInput}
          placeholder='رمز عبور قدیمی *'
          value={oldPassword}
          type='password'
          onChange={e => changeHandler(e, 'oldPassword')}
        />
        <input
          className={classes.usernameInput}
          placeholder='رمز عبور جدید *'
          value={newPassword}
          type='password'
          onChange={e => changeHandler(e, 'newPassword')}
        />
        <input
          className={classes.passwordInput}
          placeholder='تایید رمز عبور جدید *'
          value={confirmPassword}
          type='password'
          onChange={e => changeHandler(e, 'confirmPassword')}
        />
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ویرایش اطلاعات'}</button>
      </form>
      <ToastContainer rtl />
    </div>
  )
}

export default EditAdmin
