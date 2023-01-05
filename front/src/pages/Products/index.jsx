import React, { useState, useEffect } from 'react'
import cx from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import styles from './styles'
import getProducts from '../../services/getProducts'
import dltf from '../../utilities/dltf'

const Products = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getProducts().then(data => setProducts(data))
  }, [])

  return (
    <div className={classes.productsRoot}>
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
              <span>{product.name}</span>
              <span className={cx({[classes.stock]: true, [classes.zeroStock]: !!!product.stock_number})} >موجودی انبار: {dltf(product.stock_number)}</span>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products
