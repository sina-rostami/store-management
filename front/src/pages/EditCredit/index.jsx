import React, { useEffect, useState } from 'react'
import styles from "./styles"
import { useLocation, useNavigate } from 'react-router-dom'
import getCustomerById from '../../services/getCustomerById'
import dltf from '../../utilities/dltf'
import {seperateByComma} from '../../utilities/seperateByComma'
import editCredit from '../../services/editCredit'

function EditCredit(props){
    const [credit, setCredit] = useState('')
    const [id, setId] = useState(null)
    const [name, setName] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [charge, setCharge] = useState('')
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
        if (type === 'charge') {
          setCharge(e.target.value)
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
          editCredit({ id: location.state.id, data: {balance: +credit} })
          .then(res => {
            setIsLoading(false)
            if (res.succeeded) {
              navigate('/credit')
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
        <div className={classes.formContainer}>
            <h1 className={classes.pageTitle}>افزایش اعتبار</h1>
            <span className={classes.customerName}>شماره مشتری : {dltf(+id)} </span>
            <span className={classes.customerName}>نام مشتری : {name} </span>
            <span className={classes.customerName}>اعتبار : {dltf(seperateByComma(credit))} </span>
            <form className={classes.form} onSubmit={handleSubmit}>
            <input
            className={classes.creditInput}
            placeholder='مقدار واریزی *'
            value={charge}
            onChange={e => changeHandler(e, 'charge')}
            />
            <span>اعتبار جدید : { dltf(seperateByComma(+charge + credit)) }</span>
            <button className={classes.submitBtn}>{isLoading ? 'در حال ثبت ...' : 'ثبت'}</button>
            </form>
        </div>
    )
}

export default EditCredit