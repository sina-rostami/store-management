import React, { useState } from 'react'

import styles from './styles'
import dltf from '../../utilities/dltf.js'
import { seperateByComma } from '../../utilities/seperateByComma.js'
import cx from 'classnames'

function Product (props) {
  const { product, handleCart, cart } = props
  const { name, price, id, stock_number, profile_photo_link } = product
  const [stockNumber, setStockNumber] = useState(stock_number)
  const classes = styles()

  const cartItem = cart.items.find(cartItem => cartItem.id === id)

  const handleStockNumber = (action) => {
    if (action === 'add') {
      setStockNumber(stockNumber + 1)
    } else if (action === 'sub') {
      setStockNumber(stockNumber - 1)
    }
  }

  return (
    <div className={classes.product} key={id}>
      {profile_photo_link
        ? <img src={profile_photo_link} alt={name} title={name} />
        : <div className={classes.imgPlaceholder}></div>
      }
      <div className={classes.name}>{name}</div>
      <div className={classes.price}>قیمت: {dltf(seperateByComma(price))} تومان</div>
      <div className={cx({[classes.stockRow]: true, [classes.zeroStock]: !!!stockNumber})}>
        <span>موجودی انبار: {dltf(stockNumber)}</span>
      </div>
      <div className={classes.secondRow}>
        <button
          className={cx({[classes.btn]: true, [classes.disabledBtn]: !!!stockNumber})}
          onClick={!!stockNumber ? () => {handleCart(id, 'add'); handleStockNumber('sub')} : null}
        >
          +
        </button>
        <span
          className={classes.qty}
        >
          {cartItem?.quantity ? dltf(cartItem.quantity) : dltf(0)}
        </span>
        <button
          className={cx({[classes.btn]: true, [classes.disabledBtn]: !!!cartItem?.quantity})}
          onClick={cartItem?.quantity ? () => {handleCart(id, 'remove'); handleStockNumber('add')} : null}
        >
          -
        </button>
      </div>
    </div>
  )
}

export default Product
