import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  productsRoot: {
    padding: [0, 60, 60],

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

    '@media (min-width: 768px)': {
      marginBottom: 40,
    },
    '@media (min-width: 1360px)': {
      marginBottom: 50,
    },
  },

  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 170px)',
    justifyContent: 'center',
    rowGap: 20,
    columnGap: 20,

    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fill, 250px)',
    },

    '@media (min-width: 1360px)': {
      gridTemplateColumns: 'repeat(auto-fill, 300px)',
    },
  },

  product: {
    height: 170,
    width: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    borderRadius: 10,
    cursor: 'pointer',

    '@media (min-width: 768px)': {
      height: 250,
      width: 250,
    },

    '@media (min-width: 1360px)': {
      height: 300,
      width: 300,
    },
  },

  addProduct: {
    fontSize: 80,

    '@media (min-width: 768px)': {
      fontSize: 100,
    },

    '@media (min-width: 1360px)': {
      fontSize: 120,
    },
  },
})

export default styles
