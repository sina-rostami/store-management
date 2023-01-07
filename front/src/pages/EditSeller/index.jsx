import React, { useState, useEffect } from 'react'
import styles from './styles'
import editSeller from '../../services/editSeller.js'
import { ToastContainer, toast } from 'react-toastify'
import ImageUpload from '../../components/ImageUpload/index.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { useLocation, useNavigate } from 'react-router-dom'
import getSellerById from '../../services/getSellerById'
import { passwordPattern, usernamePattern, namePattern } from '../../constants/regex.js'


const EditSeller = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [isActive, setIsActive] = useState(false)
  const [selectedImg, setSelectedImg] = useState(null)
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
      // setIsActive(res.is_active)
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
    }
    // else if (type === 'isActive') {
    //   setIsActive(!isActive)
    // }
  }

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!ویرایش فروشنده با موفقیت انجام شد', {
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
      // formData.append('is_active', isActive)
      editSeller({ id: location.state.id, data: formData })
      .then(res => {
        setIsLoading(false)
        if (res.succeeded) {
          navigate('/sellers')
          showToastMessage('success')
          setFirstName('')
          setLastName('')
          setUsername('')
          setPassword('')
          // setIsActive(false)
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
        {/* <label
          className={classes.checkboxLabel}
        >
          فعال بودن
          <input
            type="checkbox"
            className={classes.checkboxInput}
            checked={isActive}
            onChange={e => changeHandler(e, 'isActive')}
          />
        </label> */}
        <img src="" alt="" />
        <ImageUpload setImage={setSelectedImg} />
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت'}</button>
      </form>
    </div>
  )
}

export default EditSeller
