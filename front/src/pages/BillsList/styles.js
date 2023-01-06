import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  billsListRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: [0, 30, 60],

    '@media (min-width: 768px)': {
      padding: [0, 50, 80],
    },
    '@media (min-width: 1360px)': {
      padding: [0, 60, 100],
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

    '& span': {
      fontSize: 12,
    },

    '@media (min-width: 768px)': {
      '& img': {
        height: 25,
        width: 25,
      },

      '& span': {
        fontSize: 14,
      },
    },

    '@media (min-width: 1360px)': {
      '& img': {
        height: 30,
        width: 30,
      },

      '& span': {
        fontSize: 16,
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

  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    border: '1px solid black',
    borderRadius: 5,
    marginBottom: 15,
    padding: [0, 10],

    '& span': {
      fontSize: 14,
      fontWeight: 700,
    },

    '@media (min-width: 768px)': {
      height: 50,
      marginBottom: 20,
      padding: [0, 15],

      '& span': {
        fontSize: 16,
      },
    },

    '@media (min-width: 1360px)': {
      height: 60,
      marginBottom: 25,
      padding: [0, 20],

      '& span': {
        fontSize: 18,
      },
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
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  customerHeader: {
    display: 'flex',
    width: '25%',

    '@media (min-width: 768px)': {
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  idHeader: {
    display: 'flex',
    width: '15%',
    fontSize: 12,

    '@media (min-width: 768px)': {
      width: '15%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  submitDateHeader: {
    display: 'none',

    '@media (min-width: 768px)': {
      width: '15%',
      display: 'flex',
    },

    '@media (min-width: 1360px)': {

    },
  },

  submitTimeHeader: {
    display: 'none',

    '@media (min-width: 768px)': {
      width: '20%',
      display: 'flex',
    },

    '@media (min-width: 1360px)': {

    },
  },

  noItem: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    marginTop: 200,

    '@media (min-width: 768px)': {
      fontSize: 22,
      marginTop: 215,
    },

    '@media (min-width: 1360px)': {
      fontSize: 30,
      marginTop: 230,
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
    backgroundColor: 'rgba(175,194,212,1)',

    '& hover': {
      backgroundColor: 'rgba(175,194,212,0.5)',
    },

    '& span': {
      fontSize: 14,
      fontWeight: 700,
    },

    '@media (min-width: 768px)': {
      height: 50,
      marginBottom: 20,
      padding: [0, 15],

      '& span': {
        fontSize: 16,
      },
    },

    '@media (min-width: 1360px)': {
      height: 60,
      marginBottom: 25,
      padding: [0, 20],

      '& span': {
        fontSize: 18,
      },
    },
  },

  indexContainer: {
    display: 'flex',
    width: '13%',

    '& span': {
      width: 25,
      textAlign: 'center',
    },

    '@media (min-width: 768px)': {
      width: '10%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  sellerContainer: {
    display: 'flex',
    width: '30%',

    '@media (min-width: 768px)': {
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  customerContainer: {
    display: 'flex',
    width: '25%',

    '@media (min-width: 768px)': {
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  idContainer: {
    display: 'flex',
    width: '15%',

    '& span': {
      width: 25,
      textAlign: 'center',
    },

    '@media (min-width: 768px)': {
      width: '15%',

      '& span': {
        width: 32,
      },
    },

    '@media (min-width: 1360px)': {

    },
  },

  submitDateContainer: {
    display: 'none',

    '@media (min-width: 768px)': {
      width: '15%',
      display: 'flex',
    },

    '@media (min-width: 1360px)': {

    },
  },

  submitTimeContainer: {
    display: 'none',

    '@media (min-width: 768px)': {
      width: '15%',
      display: 'flex',
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
      width: '5%',

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
