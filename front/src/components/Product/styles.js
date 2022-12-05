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
      height: 300,
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
    fontSize: 14,

    '@media (min-width: 768px)': {
      fontSize: 18,
    },

    '@media (min-width: 1360px)': {
      fontSize: 22,
    },
  },

  price: {
    fontSize: 14,

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

  secondRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60%',
  },

  btn: {
    width: '30%',
    height: 30,
    borderRadius: 7,
  },
})

export default styles
