import React from 'react'
import Grid from '@mui/material/Grid'
import { ToastContainer, toast } from 'react-toastify'
import styles from './styles'
import dltf from '../../utilities/dltf.js'
import { seperateByComma } from '../../utilities/seperateByComma.js'
import 'react-toastify/dist/ReactToastify.css'

function StaticCart (props) {
  const { items, totalPrice } = props
  const classes = styles()

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
              {dltf(seperateByComma(item.price))}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {dltf(item.quantity)}
            </Grid>
            <Grid className={classes.gridItem} item xs={3} sm={3} md={3} lg={3}>
              {dltf(seperateByComma(item.price * item.quantity))}
            </Grid>
          </Grid>
        ))
      }
      <span className={classes.totalPrice}>جمع کل: {dltf(seperateByComma(totalPrice))} تومان</span>
    </div>
  )
}

export default StaticCart
