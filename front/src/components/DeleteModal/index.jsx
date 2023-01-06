import React, { useState } from 'react'
import styles from './styles'
import { useNavigate } from 'react-router-dom'
import deleteCustomer from '../../services/deleteCustomer'
import deleteSeller from '../../services/deleteSeller'


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

        }
      })
    } else if ('customer') {
      deleteCustomer(idToDelete).then(res => {
        if (res.succeeded) {
          modalHandler()
          navigate('/customers-mng')
        } else {

        }
      })
    } else if ('product') {

    }
  }

  return (
    <div className={classes.modal}>
      <span className={classes.close} onClick={modalHandler} title="Close Modal">&times;</span>
      <div className={classes.modalContent}>
        <div className={classes.modalContainer}>
          <h1>{title}</h1>
          <p>{question}</p>
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