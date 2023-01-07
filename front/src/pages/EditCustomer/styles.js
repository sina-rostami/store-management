import { createUseStyles } from 'react-jss'

const styles = createUseStyles({
  addProductsRoot: {
    padding: [0, 20, 60],

    '@media (min-width: 768px)': {
      padding: [0, 80, 80],
    },

    '@media (min-width: 1360px)': {
      padding: [0, 100, 100],
    },
  },

  pageTitle: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 14,

    '@media (min-width: 768px)': {
      marginBottom: 40,
      fontSize: 20,
    },
    '@media (min-width: 1360px)': {
      marginBottom: 50,
      fontSize: 28,
    },
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  firstNameInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },

  lastNameInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },

  creditInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    direction: 'ltr',
  },

  phoneNumberInput: {
    width: 300,
    height: 50,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    direction: 'ltr',
  },

  submitBtn: {
    width: 150,
    height: 30,
  },
})

export default styles
