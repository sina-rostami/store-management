import React, { useState } from 'react'
import styles from './styles'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import addSeller from '../../services/addSeller.js'
import { useNavigate } from 'react-router-dom'
import ImageUpload from '../../components/ImageUpload/index.jsx'
import { passwordPattern, usernamePattern, namePattern } from '../../constants/regex.js'

const AddSeller = () => {
  const classes = styles()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [selectedImg, setSelectedImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!افزودن فروشنده با موفقیت انجام شد', {
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

  const checkIsFormValid = () => {
    if (!usernamePattern.test(username)) {
      showToastMessage('error', 'طول نام کاربری باید بین ۴ تا ۱۵ کاراکتر باشد')

      return false
    }

    if (!namePattern.test(firstName)) {
      showToastMessage('error', 'طول نام باید بین ۲ تا ۱۵ کاراکتر باشد')

      return false
    }

    if (!namePattern.test(lastName)) {
      showToastMessage('error', 'طول نام خانوادگی باید بین ۲ تا ۱۵ کاراکتر باشد')

      return false
    }

    if (!passwordPattern.test(password)) {
      showToastMessage('error', 'رمز عبور باید شامل حروف انگلیسی بزرگ و کوچک، عدد و کاراکتر خاص باشد!')

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
    if (!username) {
      emptyInputs.push('نام کاربری')
    }
    if (!password) {
      emptyInputs.push('رمز عبور')
    }

    if (emptyInputs.length !== 0) {
      showToastMessage('error', `${emptyInputs.join(' و ')} را وارد کنید!`)

      return false
    }

    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(checkIsFormFilled() && checkIsFormValid()) {
      setIsLoading(true)
      const formData = new FormData()
      formData.append('file', selectedImg)
      formData.append('name', firstName + ' ' + lastName)
      formData.append('username', username)
      formData.append('password', password)
      addSeller(formData)
      .then(res => {
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

          if (message === 'INVALID_TOKEN') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('role')
            authDispatch({ type: 'logout' })
          }
          if (message === 'ALREADY_EXISTS') {
            showToastMessage('error', 'این فروشنده قبلا ثبت شده است')
          }
        }
      })
    }
  }

  return (
    <div className={classes.addSellerRoot}>
      <ToastContainer rtl />
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
        <ImageUpload setImage={setSelectedImg} />
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت فروشنده'}</button>
      </form>
    </div>
  )
}

export default AddSeller
