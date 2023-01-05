import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  container: {
    // marginBottom: 10,
    height: 80,
    display: 'flex',
    flexDirection: 'column',
    // border: '1px solid black',
    alignItems: 'center',
    justifyContent: 'space-around',

    '@media (min-width: 768px)': {

    },

    '@media (min-width: 1360px)': {

    },
  },

  imgInput: {
    margin: '0 auto',
    textAlign: 'center',
    width: '75%',
  },

  uploadedImg: {
    height: 50,
    width: 50,
    borderRadius: '50%',
  },

  imgPlaceholder: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
    borderRadius: '50%',
  },
})

export default styles