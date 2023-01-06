import React, { useState, useEffect } from "react"
import styles from "./styles"
import { useNavigate, useLocation } from 'react-router-dom'
import StaticCart from '../../components/StaticCart/index.jsx'
import getBill from '../../services/getBill.js'
import getProducts from '../../services/getProducts.js'
import dltf from "../../utilities/dltf"
import { ToastContainer, toast } from 'react-toastify'
import Grid from '@mui/material/Grid'
import 'react-toastify/dist/ReactToastify.css'



function Bill (props) {
  const [products, setProducts] = useState([])
  const [bill, setBill] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const classes = styles()
  const { items, totalPrice } = props

  const handleCartItems = () => {
    if (bill) {
      const itemsToAdd = []
      bill.products.forEach(elem => {
        const cartItem = products.find(product => product.id === elem.id)
        const temp = {
          id: cartItem.id,
          price: cartItem.price,
          name: cartItem.name,
          quantity: elem.quantity,
        }
        itemsToAdd.push(temp)
      })
      setCartItems([ ...cartItems, ...itemsToAdd])
    }
  }

  useEffect(() => {
    getProducts().then(res => setProducts(res))
    getBill(location.state.id).then(res => {
      setBill(res)
    })
  }, [])

  useEffect(() => {
    if (bill && cartItems.length === 0 && products.length !== 0) {
      handleCartItems()
    }
  }, [bill])

  return (
    <div className={classes.pageHeader}>
      <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
      <h1 className={classes.pageTitle}>فاکتور</h1>
      {bill &&
        (
          <div className={classes.cartContainer}>
            <ToastContainer rtl />
            <Grid container className={classes.headerContainer}>
        <Grid className={classes.gridHeader} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
          فروشنده
        </Grid>
        <Grid className={classes.gridHeader} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
          خریدار
        </Grid>
        <Grid className={classes.gridHeader} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
          شناسه خرید
        </Grid>
        <Grid className={classes.gridHeader} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
          تاریخ خرید
        </Grid>
        <Grid className={classes.gridHeader} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
          ساعت خرید
        </Grid>
      </Grid>
      <hr />
      {/* {
        items.map((item) => (
          <Grid className={classes.cartItem} container key={bill.seller_name}>
            <Grid className={classes.gridItem} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
              {bill.customer_name}
            </Grid>
            <Grid className={classes.gridItem} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
              {dltf(dltf(bill.id))}
            </Grid>
            <Grid className={classes.gridItem} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
              {dltf(Intl.DateTimeFormat('fa', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(bill.date * 1000))}
            </Grid>
            <Grid className={classes.gridItem} item xs={2.25} sm={2.25} md={2.25} lg={2.25}>
              {Intl.DateTimeFormat('fa', {hour: '2-digit', minute: '2-digit',second: '2-digit' }).format(bill.date * 1000)}
            </Grid>
          </Grid>
        ))
      }     */}
            {/* <ul className={classes.topSection}>
              <li className={classes.sellerName}>فروشنده: {bill.seller_name}</li>
              <li className={classes.customerName}>خریدار: {bill.customer_name}</li>
              <li className={classes.id}>شناسه خرید: {dltf(bill.id)}</li>
              <li className={classes.purchaseDate}>
                تاریخ خرید:
                {Intl.DateTimeFormat('fa', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(bill.date * 1000)}
              </li>
              <li className={classes.shoppingCart}>
                ساعت خرید:
                {Intl.DateTimeFormat('fa', {hour: '2-digit', minute: '2-digit',second: '2-digit' }).format(bill.date * 1000)}
              </li>
            </ul> */}
            {cartItems.length === bill.products.length && <StaticCart totalPrice={bill.total_price} items={cartItems}/>}
          </div>
        )
      }
    </div>
  )
}

export default Bill