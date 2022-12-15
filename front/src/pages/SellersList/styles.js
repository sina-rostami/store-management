import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  sellersListRoot: {
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
    fontSize: 12,

    '@media (min-width: 768px)': {
      fontSize: 14,
    },
    '@media (min-width: 1360px)': {
      fontSize: 16,
    },
  },

  imgHeader: {
    display: 'flex',
    width: '17%',
    fontSize: 12,

    '@media (min-width: 768px)': {
      fontSize: 14,
    },
    '@media (min-width: 1360px)': {
      fontSize: 16,
    },
  },

  nameHeader: {
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

  entryDateHeader: {
    display: 'none',

    '@media (min-width: 768px)': {
      display: 'flex',
      width: '20%',
      fontSize: 14,
    },

    '@media (min-width: 1360px)': {
      fontSize: 16,
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

  sellersRow: {
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
    width: '13%',

    '& span': {
      textAlign: 'center',
      width: 24,
    },

    '@media (min-width: 768px)': {

    },

    '@media (min-width: 1360px)': {

    },
  },

  imgContainer: {
    display: 'flex',
    width: '17%',

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
