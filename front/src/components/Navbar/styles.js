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

    },
    //laptop
    '@media (min-width: 1324px)': {

    },
    //desktop
    '@media (min-width: 2024px)': {

    },
  },

  leftSection : {
    display: 'flex',
  },

  middleSection : {
    display: 'flex',
    flex: '2',
  },

  rightSection : {
    display: 'flex',
  },

})

export default styles
