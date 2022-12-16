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
