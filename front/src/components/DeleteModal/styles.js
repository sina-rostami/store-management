import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  modal: {
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: '#474e5d',
    paddingTop: 50,
  },

  modalContent: {
    backgroundColor: '#fefefe',
    margin: '5% auto 15% auto',
    border: '1px solid #888',
    width: '40%',
    height: 150,
  },

  close: {
    position: 'absolute',
    right: 35,
    top: 15,
    fontSize: 40,
    fontWeight: 700,
    color: '#f1f1f1',

    '&:hover': {
      color: '#f44336',
      cursor: 'pointer',
    },

    '&:focus': {
      color: '#f44336',
      cursor: 'pointer',
    },
  },

  modalContainer: {
    padding: 16,
    textAlign: 'center',
    // display: 'flex',
    // justifyContent: 'space-between',
    // flexDirection: 'column',
    // alignItems: 'center',
  },

  clearfix: {
    '& button': {
      color: 'white',
      padding: '14px 20px',
      margin: '8px 0',
      border: 'none',
      cursor: 'pointer',
      opacity: '0.9',
      fontWeight: 700,
      fontSize: 18,

      '&:hover': {
        opacity: '1',
      }
    }
  },

  cancelbtn: {
    float: 'left',
    width: '50%',
    backgroundColor: '#ccc',
    color: 'black',
  },

  deletebtn: {
    float: 'left',
    width: '50%',
    backgroundColor: '#f44336',
  },
})

export default styles
