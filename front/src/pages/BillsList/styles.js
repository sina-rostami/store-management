import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  billsListRoot: {
    display: 'flex',
    flexDirection: 'column',
    padding: [60, 30],

    '@media (min-width: 768px)': {
      padding: [80, 50],

    },
    '@media (min-width: 1360px)': {
      padding: [100, 60],

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

  imgContainer: {
    display: 'flex',
    width: '20%',

    '& div': {
      height: 25,
      width: 25,
      borderRadius: '50%',
      backgroundColor: 'lightgray',
    },

    '@media (min-width: 768px)': {

      '& div': {
        height: 30,
        width: 30,
      },
    },

    '@media (min-width: 1360px)': {

      '& div': {
        height: 35,
        width: 35,
      },
    },
  },

  nameContainer: {
    display: 'flex',
    width: '40%',
    fontSize: 12,

    '@media (min-width: 768px)': {
      width: '30%',
      fontSize: 14,
    },

    '@media (min-width: 1360px)': {
      width: '30%',
      fontSize: 16,
    },
  },

  entryDateContainer: {
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
    width: '30%',
    cursor: 'pointer',

    '& img': {
      border: '1px solid black',
      borderRadius: '50%',
      height: 25,
      width: 25,
    },

    '@media (min-width: 768px)': {
      width: '20%',

      '& img': {
        height: 30,
        width: 30,
      },
    },

    '@media (min-width: 1360px)': {
      width: '20%',

      '& img': {
        height: 35,
        width: 35,
      },
    },
  },
})

export default styles
