import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  cartContainer: {
    marginTop: 60,

    '@media (min-width: 768px)': {

    },
    '@media (min-width: 1360px)': {

    },
  },

  title: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 20,
  },

  headerContainer: {
    marginTop: 16,
    marginBottom: 8,
  },

  gridHeader: {
    textAlign: 'center',
  },

  cartItem: {
    margin: [20, 0],
  },

  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& img': {
      width: 75,
      height: 75,

      '@media (min-width: 768px)': {
        width: 150,
        height: 150,
      },

      '@media (min-width: 1360px)': {
        width: 200,
        height: 200,
      },
    },
  },

  totalPrice: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
  },

  submitBtn: {
    display: 'block',
    margin: '0 auto',
    marginBottom: 20,
  },
})

export default styles
