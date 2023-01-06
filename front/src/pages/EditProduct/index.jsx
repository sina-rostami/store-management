import React, { useState } from 'react'
import styles from './styles'
import editProduct from '../../services/editProduct'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ImageUpload from '../../components/ImageUpload/index.jsx'
import dltf from '../../utilities/dltf.js'
import { useLocation,useNavigate } from 'react-router-dom'
import getProductById from '../../services/getProductById'
import { useEffect } from 'react'
import { namePattern } from '../../constants/regex'

const EditProduct = () => {
  const classes = styles()
  const [counter, setCounter] = useState(0)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [selectedImg, setSelectedImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getProductById({id: location.state.id}).then(res => {
        setName(res.name)
        setPrice(res.price)
        setCounter(res.stock_number)
    })
  },[])

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
      toast.success('!ویرایش محصول با موفقیت انجام شد', {
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

  const checkIsFormValid = () => {
    if (isNaN(Number(price))) {
      showToastMessage('error', 'مقدار قیمت باید عدد باشد!')

      return false
    }

    if (!namePattern.test(name)) {
      showToastMessage('error', 'طول نام محصول باید بین ۲ تا ۱۵ کاراکتر باشد')

      return false
    }
    return true
  }

  const checkIsFormFilled = () => {
    const emptyInputs = []

    if (!name) {
      emptyInputs.push('نام')
    }
    if (!price) {
      emptyInputs.push('قیمت')
    }
    
    if (emptyInputs.length !== 0) {
      showToastMessage('error', `${emptyInputs.join(' و ')} را وارد کنید!`)

      return false
    }

    return true
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if(checkIsFormFilled() && checkIsFormValid()){
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', selectedImg)
        formData.append('name', name)
        formData.append('category_id', 1)
        formData.append('price', +price)
        formData.append('stock_number', counter)
        editProduct({id: location.state.id, data: formData})
        .then(res => {
          setIsLoading(false)
          if (res.succeeded) {
            navigate('/products')
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
  }

  return (
    <div className={classes.addProductsRoot}>
      <h3 className={classes.pageTitle}>ویرایش محصول</h3>
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
          <div className={classes.qtyInput}>{dltf(counter)}</div>
          <div className={classes.qtyBtn} onClick={() => handleCounter('sub')}>-</div>
        </div>
        <ImageUpload setImage={setSelectedImg} />
        <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت محصول'}</button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditProduct
