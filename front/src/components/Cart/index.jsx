import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { ToastContainer, toast } from 'react-toastify'

import styles from './styles'

import dltf from '../../utilities/dltf.js'

import 'react-toastify/dist/ReactToastify.css'
import submitOrder from '../../services/submitOrder'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from '../../context/index.js'

function Cart (props) {
  const { items, totalPrice, handleCart, customerId } = props
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const navigate = useNavigate('')
  const { userId } = useAuthState()
  const classes = styles()

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!ثبت سفارش با موفقیت انجام شد', {
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

  const submitPurchase = () => {
    const products = items.map(item => ({ id: item.id, quantity: item.quantity }))
    setIsBtnLoading(true)
    submitOrder({
      data: {
        seller_id: +userId,
        customer_id: customerId,
        products: [
          ...products,
        ],
      },
      method: 'post',
    }).then(res => {
      setIsBtnLoading(false)
      if (res.succeeded) {
        handleCart(0, 'removeAll')
        navigate('/select-customer')
        // setTimeout(() => showToastMessage('success'), 1000)
        // window.scrollTo(0, 0)
      } else {
        const { message } = res.response.data

        if (message === 'CREDIT_NOT_ENOUGH') {
          showToastMessage('error', '!موجودی حساب مشتری کافی نمی باشد')
        }
        if (message === 'SELLER_NOT_ACTIVE') {
          showToastMessage('error', '!حساب کاربری شما فعال نمی باشد')
        }
      }
    })
  }

  return (
    <div className={classes.cartContainer}>
      <ToastContainer rtl />
      <span className={classes.title}>سبد فروش</span>
      <Grid container className={classes.headerContainer}>
        <Grid className={classes.gridHeader} item xs={3} sm={3} md={3} lg={3}>
          کالا
        </Grid>
        <Grid className={classes.gridHeader} item xs={3} sm={3} md={3} lg={3}>
          قیمت
        </Grid>
        <Grid className={classes.gridHeader} item xs={3} sm={3} md={3} lg={3}>
          تعداد
        </Grid>
        <Grid className={classes.gridHeader} item xs={3} sm={3} md={3} lg={3}>
          مجموع
        </Grid>
      </Grid>
      <hr />
      {
        items.map((item) => (
          <Grid className={classes.cartItem} container key={item.id}>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {item.name}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {dltf(item.price)}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {dltf(item.quantity)}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {dltf(item.price * item.quantity)}
            </Grid>
          </Grid>
        ))
      }
      <span className={classes.totalPrice}>جمع کل: {dltf(totalPrice)} تومان</span>
      <div className={classes.submitBtn}>
        <Button variant="contained" onClick={submitPurchase}>
          {isBtnLoading ? 'در حال ثبت' : 'ثبت فروش'}
        </Button>
      </div>
    </div>
  )
}

export default Cart
