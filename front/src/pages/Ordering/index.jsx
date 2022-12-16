import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './styles'

import Cart from '../../components/Cart/index.jsx'
import Product from '../../components/Product/index.jsx'
import getProducts from '../../services/getProducts'

const Ordering = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({ items: [], totalPrice: 0 })
  const classes = styles()
  const navigate = useNavigate()

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
    <div className={classes.productsRoot}>
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>ثبت خرید</h3>
      </div>
      <div className={classes.products}>
        {products.length === 0
          ? <span>در حال دریافت اطلاعات ...</span>
          : products.map(product => (
            <Product product={product} handleCart={handleCart} key={product.id} cart={cart} />
          ))
        }
      </div>
      {!!cart.items.length && <Cart items={cart.items} totalPrice={cart.totalPrice} />}
    </div>
  )
}

export default Ordering
