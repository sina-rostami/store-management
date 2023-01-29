import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  productsRoot: {
    padding: [0, 60, 60],

    '@media (min-width: 768px)': {
      padding: [0, 80, 80],
    },

    '@media (min-width: 1360px)': {
      padding: [0, 100, 100],
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

  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, 170px)',
    justifyContent: 'center',
    rowGap: 20,
    columnGap: 20,

    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(auto-fill, 250px)',
    },

    '@media (min-width: 1360px)': {
      gridTemplateColumns: 'repeat(auto-fill, 300px)',
    },
  },
})

export default styles
