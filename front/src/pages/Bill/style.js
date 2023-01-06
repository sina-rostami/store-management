import { createUseStyles } from 'react-jss'

const styles = createUseStyles({    

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

  sellerName :{
    fontSize: 16,
    marginBottom: 10,

  },

  customerName: {
    fontSize: 16,
    marginBottom: 10,
  },

  purchaseDate:{
    fontSize: 16,
    marginBottom: 10,
  },

  id: {
    fontSize: 16,
    marginBottom: 10,
  },

  shoppingCart: {
    fontSize: 16,
    marginBottom: 10,
  }
})

export default styles