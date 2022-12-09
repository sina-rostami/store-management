import React, { useState, useEffect } from 'react'

import cx from 'classnames'

import styles from './styles'

import getProducts from '../../services/getProducts'

const Products = () => {
  const [products, setProducts] = useState([])
  const classes = styles()

  useEffect(() => {
    getProducts().then(data => setProducts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
  }, [])

  return (
    <div className={classes.productsRoot}>
      <h3 className={classes.pageTitle}>لیست محصولات</h3>
      <div className={classes.products}>
        <div className={cx(classes.product, classes.addProduct)}>+</div>
        {products.length === 0
          ? <span>در حال دریافت اطلاعات ...</span>
          : products.map(product => (
            <div className={classes.product} key={product.id}>
              {product}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Products
