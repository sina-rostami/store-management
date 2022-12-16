import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  adminPanelRoot: {
    padding: [0, 60],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    fontSize: 16,

    '@media (min-width: 768px)': {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: [0, 80],
      fontSize: 22,
    },

    '@media (min-width: 1360px)': {
      padding: [0, 100],
      fontSize: 30,
    },
  },

  adminItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid black',
    borderRadius: 10,
    height: 50,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(175,194,212,100)',

    '& a': {
      cursor: 'pointer',
      textDecoration: 'none',
      color: '#000',
    },

    '@media (min-width: 768px)': {
      height: 150,
      width: '49%',
    },

    '@media (min-width: 1360px)': {
      height: 200,
    },
  },
})

export default styles
