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
    height: 180,
    borderRadius: 10,
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
    width: '45%',
    backgroundColor: '#ccc',
    borderRadius: 10,
    color: '#000',
  },

  deletebtn: {
    float: 'right',
    width: '45%',
    backgroundColor: '#f44336',
    borderRadius: 10,
    color: '#fff',
  },

  title: {
    marginBottom: 10,
  },

  question: {
    marginBottom: 10,
    fontSize: 18,
  },
})

export default styles
