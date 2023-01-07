import React, { useState } from 'react'
import styles from './styles'
import { useNavigate } from 'react-router-dom'
import deleteCustomer from '../../services/deleteCustomer'
import deleteSeller from '../../services/deleteSeller'
import deleteProduct from '../../services/deleteProduct'


const DeleteModal = ({ modalHandler, title, question, type, idToDelete, option }) => {
  const classes = styles()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const deleteItem = () => {
    setIsLoading(true)
    if (type === 'seller') {
      deleteSeller(idToDelete).then(res => {
        if (res.succeeded) {
          modalHandler()
          navigate('/sellers-mng')
        } else {
          if (message === 'INVALID_TOKEN') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('role')
            authDispatch({ type: 'logout' })
          }
        }
      })
    } else if (type === 'customer') {
      deleteCustomer(idToDelete).then(res => {
        if (res.succeeded) {
          modalHandler()
          navigate('/customers-mng')
        } else {
          if (message === 'INVALID_TOKEN') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('role')
            authDispatch({ type: 'logout' })
          }
        }
      })
    } else if (type === 'product') {
      deleteProduct(idToDelete).then(res => {
        if (res.succeeded) {
          modalHandler()
          navigate('/products')
        } else {
          if (message === 'INVALID_TOKEN') {
            localStorage.removeItem('auth_token')
            localStorage.removeItem('role')
            authDispatch({ type: 'logout' })
          }
        }
      })
    }
  }

  return (
    <div className={classes.modal}>
      <span className={classes.close} onClick={modalHandler} title="Close Modal">&times;</span>
      <div className={classes.modalContent}>
        <div className={classes.modalContainer}>
          <h1 className={classes.title}>{title}</h1>
          <p className={classes.question}>{question}</p>
          <div className={classes.clearfix}>
            <button className={classes.cancelbtn} onClick={modalHandler}>لغو</button>
            <button className={classes.deletebtn} onClick={deleteItem}>{isLoading ? 'در حال ثبت ...' : option}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal