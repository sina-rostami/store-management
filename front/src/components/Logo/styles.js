import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  logoInNav: {
    marginTop: 60,

    '@media (min-width: 768px)': {

    },
    '@media (min-width: 1360px)': {

    },
  },

  logoWrapper : {
    display: 'flex',
    alignItems: 'center',
  },

  logoImg : {
    width: 29,
    height: 29,

    '& img': {
      width: '100%',
      height: '100%',
    },
  },

  logoText : {
    fontSize: 16,
    margin: 0,
    marginLeft: 4,
    fontWeight: 500,
  },
})

export default styles
