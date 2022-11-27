import React, { useEffect, useState } from 'react'

import Grid from '@mui/material/Grid'

import getProducts from './../../services/getProducts'
import Cart from './../Cart/index.jsx'
import Product from './../Product/index.jsx'
import styles from './styles'

const Ordering = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const classes = styles()

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

  const handleCart = (productId, action) => {
    const cartItem = cart.items.find(item => item.id === productId)

    if (action === 'add') {
      if (!cartItem) {
        const newCartItem = products.find(product => product.id === productId)
        newCartItem.quantity = 1
        cart.totalPrice += newCartItem.price

        setCart({ ...cart, items: [...cart.items, newCartItem] })
      } else {
        cartItem.quantity += 1
        cart.totalPrice += cartItem.price

        setCart({ ...cart })
      }
    } else if (action === 'remove') {
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cart.totalPrice -= cartItem.price
          cartItem.quantity -= 1
          setCart({ ...cart })
        } else {
          cart.totalPrice -= cartItem.price
          const cartItems = cart.items.filter(item => item.id !== productId)
          setCart({ ...cart, items: cartItems })
        }
      }
    }
  }

  return (
    <div className={classes.orderingContainer}>
      <Grid
        container
        sx={{
          p: 1,
        }}
        rowSpacing={1}
        columnSpacing={1}
      >
        {
          products.map((product) => (
            <Grid item key={product.id} className={classes.gridItem} xs={6} sm={6} md={4} lg={3}>
              <Product product={product} handleCart={handleCart} />
            </Grid>
          ))
        }
      </Grid>
      {!!cart.items.length && <Cart items={cart.items} totalPrice={cart.totalPrice} />}
    </div>
  )
}

export default Ordering
