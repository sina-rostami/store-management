import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  productContainer: {
    width: 200,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',

    '@media (min-width: 768px)': {
      width: 240,
      height: 240,
    },

    '@media (min-width: 1360px)': {
      width: 275,
      height: 275,
    },
  },

  productInfo: {
    margin: [5, 10],
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },

  cartButton: {
    fontWeight: 700,
    minWidth: 10,
    height: 25,

    '@media (min-width: 768px)': {
      minWidth: 20,
      height: 25,
    },

    '@media (min-width: 1360px)': {
      minWidth: 30,
      height: 35,
    },
  },

  productImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
    objectFit: 'cover',
    opacity: 0.8,
    marginLeft: 'auto',
    marginRight: 'auto',

    '@media (min-width: 768px)': {
      width: 150,
      height: 150,
    },

    '@media (min-width: 1360px)': {
      width: 200,
      height: 200,
    },
  },
})

export default styles
