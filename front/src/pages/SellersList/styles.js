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

  search: {
    width: '100%',
    height: 40,
    margin: '0 auto',
    borderRadius: 7,
    marginBottom: 10,
    padding: 10,
    fontSize: 14,

    '@media (min-width: 768px)': {
      height: 50,
      marginBottom: 20,
      fontSize: 16,
    },

    '@media (min-width: 1360px)': {
      height: 60,
      marginBottom: 25,
      fontSize: 18,
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

  usernameHeader: {
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

  sellersRow: {
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
      width: '30%',
      fontSize: 14,
    },

    '@media (min-width: 1360px)': {
      width: '30%',
      fontSize: 16,
    },
  },

  usernameContainer: {
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

  btn: {
    padding: 10,
    fontSize: 16,
    fontWeight: 700,
    width: 100,
    borderRadius: 7,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(237, 231, 225)',
    },
  },
})

export default styles
