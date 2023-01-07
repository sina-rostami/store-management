import React, { useEffect, useState } from 'react'
import styles from "./styles"
import { useLocation, useNavigate } from 'react-router-dom'
import getCustomerById from '../../services/getCustomerById'

function EditCredit(props){
    const [credit, setCredit] = useState('')
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const classes = styles()

    const navigate = useNavigate()
    const location = useLocation()


    useEffect(() => {
        getCustomerById({ id: location.state.id }).then(res => {
          setCredit(res.credit)
          setId(res.id)
          setName(res.name)
        })
      }, [])

    const changeHandler = (e, type) => {
        if (type === 'credit') {
          setCredit(e.target.value)
        } 
      }

      const showToastMessage = (type, message) => {
        if (type === 'success') {
          toast.success('! افزایش اعتبار مشتری با موفقیت انجام شد', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
          })
        } else if (type === 'error') {
          toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: false,
          })
        }
      }

      const checkIsFormValid = () => {
        if (isNaN(Number(credit))) {
          showToastMessage('error', 'مقدار اعتبار باید عدد باشد!')
    
          return false
        }
        return true
      }

      const checkIsFormFilled = () => {
        const emptyInputs = []

        if (!credit) {
          emptyInputs.push('اعتبار')
        }
    
        if (emptyInputs.length !== 0) {
          showToastMessage('error', `${emptyInputs.join(' و ')} را وارد کنید!`)
    
          return false
        }
    
        return true
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        if (checkIsFormFilled() && checkIsFormValid()) {
          setIsLoading(true)
          const formData = new FormData()
          formData.append('credit', +credit)
          editCustomer({ id: location.state.id, data: formData })
          .then(res => {
            setIsLoading(false)
            if (res.succeeded) {
              navigate('/customers')
              showToastMessage('success')
              setCredit('')
            } else {
              const { message } = res.response.data
    
              // if (message === 'CREDIT_NOT_ENOUGH') {
              //   showToastMessage('error', '!موجودی حساب مشتری کافی نمی باشد')
              // }
            }
          })
        }
      }

    return (
        <div>
            <ul className={classes.topSection}>
            <li className={classes.customerName}>شماره مشتری : {id} </li>
            <li className={classes.customerName}>نام مشتری : {name} </li>
            <li className={classes.customerName}>اعتبار : {credit} </li>
            </ul>
            <form className={classes.form} onSubmit={handleSubmit}>
            <input
            className={classes.creditInput}
            placeholder='مقدار واریزی *'
            value={credit}
            onChange={e => changeHandler(e, 'credit')}
            />
            <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت'}</button>
            </form>
        </div>
    )
}

export default EditCredit