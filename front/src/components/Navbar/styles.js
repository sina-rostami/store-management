import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  
  navbarContainer : {

    //Tablet
    '@media (min-width: 992px)': {

    },
    //laptop
    '@media (min-width: 1324px)': {

    },
    //desktop
    '@media (min-width: 2024px)': {

    },
  },

  navLinksContainer : {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  linksWrapper : {
    margin: 0,
    padding: 0,
    display: 'flex',
    height: '100%',
  },

  linkItem : {
    height: '100%',
    padding: '0 1.1em',
    fontWeight: 500,
    fontSize: 14,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',

  },

  link: {
    textDecoration: 'none',
    color: 'inherit',
    fontSize: 'inherit',
    
  }
})

export default styles
