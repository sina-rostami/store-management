import * as React from 'react'
import { useState } from 'react'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { useAuthDispatch, useAuthState } from '../../context/index.js'
import signIn from '../../services/signIn'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

document.dir = 'rtl'

const theme = createTheme({
  direction: 'rtl',
})

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const SignIn = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
    showPassword: false,
  })
  const authDispatch = useAuthDispatch()
  const { authStatus, role } = useAuthState()

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

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

  const checkIsFormFilled = () => {
    const emptyInputs = []

    if (!values.username) {
      emptyInputs.push('نام کاربری')
    }
    if (!values.password) {
      emptyInputs.push('رمز عبور')
    }

    if (emptyInputs.length !== 0) {
      showToastMessage('error', `${emptyInputs.join(' و ')} را وارد کنید`)

      return false
    }

    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if(checkIsFormFilled()) {
      signIn({
        data: {
          username: values.username,
          password: values.password,
        },
      }).then(res => {
        if (res && res.succeeded && res.token && res.role) {
          const { role, token, user_id } = res

          localStorage.setItem('auth_token', token)
          localStorage.setItem('role', role)
          localStorage.setItem('user_id', user_id )

          authDispatch({ type: 'login' })
          if (role === 'seller') {
            window.location.replace('/seller-panel')
          } else if (role === 'admin') {
            window.location.replace('/admin-panel')
          }
        } else {
          const { message } = res.response.data

          if (message === 'INVALID_DATA') {
            showToastMessage('error', 'نام کاربری یا رمز عبور وارد شده صحیح نمی‌باشد')
          }
        }
      })
    }
  }

  if (authStatus === 'loggedIn' && role === 'admin') {
    window.location.replace('/admin-panel')
  } else if (authStatus === 'loggedIn' && role === 'seller') {
    window.location.replace('/seller-panel')
  } else if (authStatus === 'loggedOut') {
    return (
      <>
        <ToastContainer rtl />
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                ورود
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="نام کاربری"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={values.username}
                    onChange={handleChange('username')}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="password"
                    label="رمز عبور"
                    name="password"
                    autoComplete="password"
                    value={values.password}
                    onChange={handleChange('password')}
                    type={values.showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    ورود
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </CacheProvider>
      </>
    )
  }
}

export default SignIn
