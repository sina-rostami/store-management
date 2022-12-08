import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  
  navbarContainer : {

    width: '100%',
    height: 60,
    boxShadow: '0 1px 3px rgba(15,15,0.13)', 
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5em',

    //Tablet
    '@media (min-width: 992px)': {

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

  leftSection: {
    display: 'flex',
  },

  middleSection: {
    display: 'flex',
    flex: '2',
    height: '100%',
    justifyContent: 'center',
  },

  rightSection: {
    display: 'flex',
  },

  navLinksContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  linksWrapper: {
    margin: 0,
    padding: 0,
    display: 'flex',
    height: '100%',
  },

  linkItem: {
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
  },
})

export default styles
