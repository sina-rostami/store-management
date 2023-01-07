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

  pageHeader: {
    position: 'relative',

    '& img': {
      position: 'absolute',
      height: 20,
      width: 20,
      verticalAlign: 'middle',
      cursor: 'pointer',
    },

    '@media (min-width: 768px)': {
      '& img': {
        height: 25,
        width: 25,
      },
    },

    '@media (min-width: 1360px)': {
      '& img': {
        height: 30,
        width: 30,
      },
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
    height: 200,
    width: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'rgba(175,194,212,1)',

    '& img': {
      height: 60,
      width: 60,
      marginBottom: 15,
    },

    '& span': {
      fontSize: 14,
    },

    '@media (min-width: 768px)': {
      height: 250,
      width: 250,

      '& img': {
        height: 100,
        width: 100,
        marginBottom: 25,
      },

      '& span': {
        fontSize: 18,
      },
    },

    '@media (min-width: 1360px)': {
      height: 350,
      width: 300,

      '& img': {
        height: 150,
        width: 150,
        marginBottom: 35,
      },

      '& span': {
        fontSize: 22,
      },
    },
  },

  name: {
    marginBottom: 5,
    fontWeight: 700,
  },

  imgPlaceholder: {
    height: 60,
    width: 60,
    backgroundColor: 'gray',
    marginBottom: 15,
    borderRadius: '50%',

    '@media (min-width: 768px)': {
      height: 100,
      width: 100,
      marginBottom: 25,
    },

    '@media (min-width: 1360px)': {
      height: 150,
      width: 150,
      marginBottom: 35,
    },
  },

  addProduct: {
    fontSize: 80,

    '& a': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#000',
    },

    '@media (min-width: 768px)': {
      fontSize: 100,
    },

    '@media (min-width: 1360px)': {
      fontSize: 120,
    },
  },

  stock: {
    marginTop: 15,
  },

  zeroStock: {
    color: 'red',
    fontWeight: 700,
  },

  btnContainer: {
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  editProduct: {
    marginTop: 10,
    padding: 8,
    cursor: 'pointer',
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 700,
  },

  deleteProduct: {
    marginTop: 10,
    padding: 8,
    cursor: 'pointer',
    borderRadius: 7,
    fontSize: 14,
    fontWeight: 700,
  }
})

export default styles
