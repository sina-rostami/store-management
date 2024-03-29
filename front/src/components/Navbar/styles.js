import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  navbarContainer: {
    width: '100%',
    height: 60,
    boxShadow: '0 1px 3px rgba(15,15,0.13)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5em',
    marginBottom: 30,

    '@media (min-width: 768px)': {
      marginBottom: 40,
    },

    '@media (min-width: 1360px)': {
      marginBottom: 50,
    },
  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: 'inherit',
    cursor: 'pointer',
  },
})

export default styles
