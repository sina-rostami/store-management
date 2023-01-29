import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles'
import getProducts from '../../services/getProducts'
import dltf from '../../utilities/dltf'
import { seperateByComma } from '../../utilities/seperateByComma'
import DeleteModal from '../../components/DeleteModal/index.jsx'
import { Waypoint } from 'react-waypoint'

const Products = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isDataFinished, setIsDataFinished] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalId, setModalId] = useState(null)
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    if (products.length === 0) {
      getProducts(currentPage).then(res => {
        setProducts(res.reverse())

        if (Array.isArray(res)) {
          if (res.length === 10) {
            setCurrentPage(currentPage + 1)
          } else {
            setIsDataFinished(true)
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    // if (isDeleteModalOpen) {
      getProducts(1).then(data => setProducts(data.filter(product => product.is_active === true)))
    // }
  }, [isDeleteModalOpen])

  const modalHandler = (id = null, name = '') => {
    setModalName(name)
    setModalId(id)
    setIsDeleteModalOpen(prev => !prev)
  }

  const onReachEnd = () => {
    if (currentPage > 1 && products.length > 0) {
      getProducts(currentPage).then(res => {
        if (Array.isArray(res)) {
          if (res.length === 10) {
            setCurrentPage(currentPage + 1)
          } else {
            setIsDataFinished(true)
          }

          setProducts((prevState) => ([...prevState, ...res]))
        }
      })
    }
  }

  return (
    <div className={classes.productsRoot}>
      {isDeleteModalOpen &&
        <DeleteModal
          modalHandler={modalHandler}
          title='حذف محصول'
          question={`آیا از حذف ${modalName} اطمینان دارید؟`}
          type='product'
          idToDelete={modalId}
          option='حذف'
        />
      }
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست محصولات</h3>
      </div>
      <div className={classes.products}>
        <div className={cx(classes.product, classes.addProduct)}>
          <Link to='/add-product'>+</Link>
        </div>
        {products.length === 0
          ? <span>در حال دریافت اطلاعات ...</span>
          : products.map(product => (
            <div className={classes.product} key={product.id}>
              {product.profile_photo_link
                ? <img src={product.profile_photo_link} alt={product.name} title={product.name} />
                : <div className={classes.imgPlaceholder}></div>
              }
              <span className={classes.name}>{product.name}</span>
              <span className={classes.price}>قیمت: {dltf(seperateByComma(product.price))} تومان</span>
              <span className={cx({[classes.stock]: true, [classes.zeroStock]: !!!product.stock_number})} >موجودی انبار: {dltf(product.stock_number)}</span>
              <div className={classes.btnContainer}>
                <button onClick={() => navigate('/edit-product', {state: {id: product.id}})} className={classes.editProduct} >ویرایش محصول</button>
                <button onClick={() => modalHandler(product.id, product.name)} className={classes.deleteProduct} >حذف محصول</button>
              </div>
            </div>
          ))
        }
        {!isDataFinished &&
          <Waypoint onEnter={onReachEnd} bottomOffset={'-10%'}/>
        }
      </div>
    </div>
  )
}

export default Products
