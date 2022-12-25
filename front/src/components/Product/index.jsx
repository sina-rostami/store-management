import React from 'react'

import styles from './styles'
import dltf from '../../utilities/dltf.js'

function Product (props) {
  const { product, handleCart, cart } = props
  const { name, price, id } = product
  const classes = styles()

  const cartItem = cart.items.find(cartItem => cartItem.id === id)

  return (
    <div className={classes.product} key={id}>
      <img src={`./asset/images/${id}.png`} alt={name} title={name} />
      <div className={classes.firstRow}>
        <div className={classes.name}>{name}</div>
        <div className={classes.price}>{dltf(price)} تومان</div>
      </div>
      <div className={classes.secondRow}>
        <button className={classes.btn} onClick={() => handleCart(id, 'add')}>+</button>
        <span className={classes.qty}>{cartItem?.quantity ? dltf(cartItem.quantity) : dltf(0)}</span>
        <button className={classes.btn} onClick={() => handleCart(id, 'remove')}>-</button>
      </div>
    </div>
  )
}

export default Product
