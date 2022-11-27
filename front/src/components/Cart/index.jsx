import React from 'react'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { ToastContainer, toast } from 'react-toastify'

import styles from './styles'

import 'react-toastify/dist/ReactToastify.css'
import submitOrder from '../../services/submitOrder'

function Cart (props) {
  const { items, totalPrice } = props
  const classes = styles()

  const showToastMessage = (type) => {
    if (type === 'success') {
      toast.success('ثبت سفارش با موفقیت انجام شد!', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else if (type === 'error') {
      toast.error('ثبت سفارش موفقیت آمیز نبود!', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const submitPurchase = () => {
    const productIds = items.map(item => item.id)
    submitOrder({
      data: {
        seller_id: 1,
        customer_id: 1,
        products_ids: [
          ...productIds,
        ],
      },
      method: 'post',
    }).then(res => {
      if (res.succeeded) {
        showToastMessage('success')
      } else {
        showToastMessage('error')
      }
    })
  }

  return (
    <div className={classes.cartContainer}>
      <span className={classes.title}>سبد خرید</span>
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
              <img src={`./asset/images/${item.id}.png`} alt="" />
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {item.price}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {item.quantity}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {item.price * item.quantity}
            </Grid>
          </Grid>
        ))
      }
      <span className={classes.totalPrice}>جمع کل: {totalPrice} تومان</span>
      <Button className={classes.submitBtn} variant="contained" onClick={submitPurchase}>
        ثبت خرید
      </Button>
      <ToastContainer />
    </div>
  )
}

export default Cart
