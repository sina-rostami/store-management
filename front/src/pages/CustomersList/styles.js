import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  customersListRoot: {
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
    width: '10%',

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
      width: '20%',
      fontSize: 14,
    },

    '@media (min-width: 1360px)': {
      fontSize: 16,
    },
  },

  joinDateHeader: {
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

  leaveDateHeader: {
    display: 'none',

    '@media (min-width: 768px)': {
      display: 'flex',
      width: '30%',
      fontSize: 14,
    },

    '@media (min-width: 1360px)': {
      fontSize: 16,
    },
  },

  customerRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    border: '1px solid black',
    borderRadius: 5,
    marginBottom: 15,
    padding: [0, 10],
    backgroundColor: 'rgba(175,194,212,100)',

    '& hover': {
      backgroundColor: 'rgba(175,194,212,50)',
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
    width: '10%',

    '& span': {
      width: 25,
      textAlign: 'center',
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

    '& img': {
      borderRadius: '50%',
      height: 25,
      width: 25,
    },

    '@media (min-width: 768px)': {
      '& div': {
        height: 30,
        width: 30,
      },

      '& img': {
        height: 30,
        width: 30,
      },
    },

    '@media (min-width: 1360px)': {
      '& div': {
        height: 50,
        width: 50,
      },

      '& img': {
        height: 50,
        width: 50,
      },
    },
  },

  nameContainer: {
    display: 'flex',
    width: '40%',
    fontSize: 12,

    '@media (min-width: 768px)': {
      width: '20%',
      fontSize: 14,
    },

    '@media (min-width: 1360px)': {
      fontSize: 16,
    },
  },

  joinDateContainer: {
    display: 'none',

    '& span': {
      width: 90,
      textAlign: 'center',
    },

    '@media (min-width: 768px)': {
      display: 'flex',
      width: '20%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  leaveDateContainer: {
    display: 'none',

    '& span': {
      width: 90,
      textAlign: 'center',
    },

    '@media (min-width: 768px)': {
      display: 'flex',
      width: '25%',
    },

    '@media (min-width: 1360px)': {

    },
  },

  seeMoreContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '5%',
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
      width: '5%',

      '& img': {
        height: 35,
        width: 35,
      },
    },
  },

  btn: {
    padding: 10,
    fontSize: 16,
    fontWeight: 700,
    width: 80,
    borderRadius: 7,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(237, 231, 225)',
    },
  },
})

export default styles
