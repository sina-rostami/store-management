import React, { useState } from 'react'

import styles from './styles'

const AddProduct = () => {
  const classes = styles()
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleCounter = (action) => {
    if (action === 'add') {
      setCounter(prev => prev + 1)
    } else if (action === 'sub') {
      setCounter(prev => prev > 0 ? prev - 1 : prev)
    }
  }

  const changeHandler = (e, type) => {
    if (type === 'name') {
      setName(e.target.value)
    } else if (type === 'price') {
      setPrice(e.target.value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
  }

  return (
    <div className={classes.addProductsRoot}>
      <h3 className={classes.pageTitle}>افزودن محصول</h3>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes.nameInput}
          placeholder='نام محصول *'
          value={name}
          onChange={e => changeHandler(e, 'name')}
        />
        <input
          className={classes.priceInput}
          placeholder='قیمت محصول *'
          value={price}
          onChange={e => changeHandler(e, 'price')}
        />
        <div className={classes.qty}>
          <div className={classes.qtyBtn} onClick={() => handleCounter('add')}>+</div>
          {/* <input className={classes.qtyInput} type="text" value={0} /> */}
          <div className={classes.qtyInput}>{counter}</div>
          <div className={classes.qtyBtn} onClick={() => handleCounter('sub')}>-</div>
        </div>
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت محصول'}</button>
      </form>
    </div>
  )
}

export default AddProduct
