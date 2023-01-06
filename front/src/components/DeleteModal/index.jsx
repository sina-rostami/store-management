import React, { useState } from 'react'
import styles from './styles'
import { useNavigate } from 'react-router-dom'
import deleteCustomer from '../../services/deleteCustomer'


const DeleteModal = ({ modalHandler, title, question, type, idToDelete }) => {
  const classes = styles()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const deleteItem = () => {
    console.log(type)
    setIsLoading(true)
    if (type === 'seller') {

    } else if ('customer') {
      deleteCustomer(idToDelete).then(res => {
        console.log(res)
        if (res.succeeded) {
          navigate('/customers')
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
            <button className={classes.deletebtn} onClick={deleteItem}>{isLoading ? 'در حال حذف ...' : 'حذف'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal