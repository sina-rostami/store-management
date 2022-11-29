import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  billsListRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: [60, 30],

    '& span': {
      fontSize: 12,
    },

    '@media (min-width: 768px)': {
      padding: [80, 50],

      '& span': {
        fontSize: 14,
      },
    },
    '@media (min-width: 1360px)': {
      padding: [100, 60],

      '& span': {
        fontSize: 16,
      },
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

  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    border: '1px solid black',
    borderRadius: 5,
    marginBottom: 15,
    padding: [0, 10],

    '@media (min-width: 768px)': {
      height: 50,
      marginBottom: 20,
      padding: [0, 15],
    },

    '@media (min-width: 1360px)': {
      height: 60,
      marginBottom: 25,
      padding: [0, 20],
    },
  },

  indexHeader: {
    display: 'flex',
    width: '13%',

    '@media (min-width: 768px)': {
      width: '10%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  sellerHeader: {
    display: 'flex',
    width: '30%',

    '@media (min-width: 768px)': {
      width: '25%',

    },
    '@media (min-width: 1360px)': {

    },
  },

  customerHeader: {
    display: 'flex',
    width: '23%',

    '@media (min-width: 768px)': {
      width: '21%',

    },
    '@media (min-width: 1360px)': {

    },
  },

  idHeader: {
    display: 'flex',
    width: '15%',
    fontSize: 12,

    '@media (min-width: 768px)': {

    },

    '@media (min-width: 1360px)': {

    },
  },

  submitDateHeader: {
    display: 'none',

    '@media (min-width: 768px)': {
      display: 'flex',
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  billRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    border: '1px solid black',
    borderRadius: 5,
    marginBottom: 15,
    padding: [0, 10],

    '@media (min-width: 768px)': {
      height: 50,
      marginBottom: 20,
      padding: [0, 15],
    },

    '@media (min-width: 1360px)': {
      height: 60,
      marginBottom: 25,
      padding: [0, 20],
    },
  },

  indexContainer: {
    display: 'flex',
    width: '10%',

    '@media (min-width: 768px)': {

    },
    '@media (min-width: 1360px)': {

    },
  },

  customerContainer: {
    display: 'flex',
    width: '30%',

    '@media (min-width: 768px)': {

    },

    '@media (min-width: 1360px)': {

    },
  },

  sellerContainer: {
    display: 'flex',
    width: '30%',

    '@media (min-width: 768px)': {

    },

    '@media (min-width: 1360px)': {

    },
  },

  idContainer: {
    display: 'flex',
    width: '15%',

    '@media (min-width: 768px)': {

    },

    '@media (min-width: 1360px)': {

    },
  },

  submitDateContainer: {
    display: 'none',

    '@media (min-width: 768px)': {
      display: 'flex',
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  seeMoreContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '15%',
    cursor: 'pointer',

    '& img': {
      border: '1px solid black',
      borderRadius: '50%',
      height: 25,
      width: 25,
    },

    '@media (min-width: 768px)': {
      width: '15%',

      '& img': {
        height: 30,
        width: 30,
      },
    },

    '@media (min-width: 1360px)': {

      '& img': {
        height: 35,
        width: 35,
      },
    },
  },
})

export default styles
