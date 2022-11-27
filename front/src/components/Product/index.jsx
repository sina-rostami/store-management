import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import styles from './styles'

function Product (props) {
  const { product, handleCart } = props
  const { name, price, id } = product
  const classes = styles()

  return (
    <Box
      className={classes.productContainer}
      sx={{
        // p: 1,
        // m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
      }}
    >
      <img className={classes.productImg} src={`./asset/images/${id}.png`} />
      <div className={classes.productInfo}>
        <span className={classes.productName}>{name}</span>
        <Button
          variant="contained"
          className={classes.cartButton}
          onClick={() => handleCart(id, 'add')}
        >
          +
        </Button>
        <Button
          variant="contained"
          className={classes.cartButton}
          onClick={() => handleCart(id, 'remove')}
        >
          -
        </Button>
        <span className={classes.productPrice}>{price}</span>
      </div>
    </Box>
  )
}

export default Product
