import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  product: {
    height: 170,
    width: 170,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: 10,
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
      height: 320,
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

  imgPlaceholder: {
    height: 60,
    width: 60,
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'gray',
    borderRadius: '50%',

    '@media (min-width: 768px)': {
      height: 100,
      width: 100,
    },

    '@media (min-width: 1360px)': {
      height: 150,
      width: 150,
    },
  },

  name: {
    fontSize: 14,
    marginBottom: 5,

    '@media (min-width: 768px)': {
      fontSize: 18,
    },

    '@media (min-width: 1360px)': {
      fontSize: 22,
    },
  },

  price: {
    fontSize: 14,
    marginBottom: 5,

    '@media (min-width: 768px)': {
      fontSize: 18,
    },

    '@media (min-width: 1360px)': {
      fontSize: 22,
    },
  },

  firstRow: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },

  zeroStock: {
    color: 'red',
    fontWeight: 700,
  },

  secondRow: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },

  btn: {
    width: '30%',
    height: 30,
    borderRadius: 7,
    cursor: 'pointer',
  },

  disabledBtn: {
    cursor: 'default',
    opacity: 0.5,
  }
})

export default styles
