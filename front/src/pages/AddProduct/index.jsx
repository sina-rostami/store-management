import React, { useState } from 'react'

import styles from './styles'
import addProduct from '../../services/addProduct.js'

import { ToastContainer, toast } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import ImageUpload from '../../components/ImageUpload/ImageUpload'

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

  const showToastMessage = (type, message) => {
    if (type === 'success') {
      toast.success('!ثبت محصول با موفقیت انجام شد', {
        position: toast.POSITION.TOP_CENTER,
      })
    } else if (type === 'error') {
      toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    addProduct({
      name,
      category_id: 1,
      price: +price,
      stock_number: counter,
    }).then(res =>{
      setIsLoading(false)
      if (res.succeeded) {
        showToastMessage('success')
        setCounter(0)
        setName('')
        setPrice('')
      } else {
        const { message } = res.response.data

        // if (message === 'CREDIT_NOT_ENOUGH') {
        //   showToastMessage('error', '!موجودی حساب مشتری کافی نمی باشد')
        // }
      }
    })
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
        <ImageUpload /> 
        {/* <input className={classes.imageInput} placeholder='بارگذاری تصویر' /> */}
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت محصول'}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default AddProduct
