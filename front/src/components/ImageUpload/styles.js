import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  container: {
    marginBottom: 10,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
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

  }
})

export default styles