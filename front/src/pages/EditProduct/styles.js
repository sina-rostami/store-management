import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  addProductsRoot: {
    padding: [0, 20, 60],

    '@media (min-width: 768px)': {
      padding: [0, 80, 80],
    },

    '@media (min-width: 1360px)': {
      padding: [0, 100, 100],
    },
  },

  pageTitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 14,

    '@media (min-width: 768px)': {
      marginBottom: 40,
      fontSize: 20,
    },
    '@media (min-width: 1360px)': {
      marginBottom: 50,
      fontSize: 28,
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  nameInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },

  priceInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    direction: 'ltr',
  },

  qty: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  qtyInput: {
    width: 100,
    height: 30,
    marginBottom: 20,
    padding: [10, 43],
    border: '2px solid #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  qtyBtn: {
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #000',
    width: 50,
  },

  submitBtn: {
    width: 150,
    height: 30,
  },
})

export default styles
