import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getCustomers from '../../services/getCustomers'
import dltf from '../../utilities/dltf'
import { seperateByComma } from '../../utilities/seperateByComma.js'
import styles from './styles'
import DeleteModal from '../../components/DeleteModal/index.jsx'

const CustomersList = () => {
  const [customers, setCustomers] = useState([])
  const [filteredCutomers, setFilteredCustomers] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalId, setModalId] = useState(null)
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getCustomers().then(res =>{
      if (Array.isArray(res)) {
        setCustomers(res.reverse())
      }
    })
  }, [])

  const modalHandler = (id = null, name = '') => {
    setModalName(name)
    setModalId(id)
    setIsDeleteModalOpen(prev => !prev)
  }

  useEffect(() => {
    if (searchedText) {
      setFilteredCustomers(
        customers.filter(customer => customer.name.includes(searchedText))
      )
    } else {
      setFilteredCustomers(customers)
    }
  }, [searchedText, customers])

  const searchHandler = (e) => {
    setSearchedText(e.target.value)
  }

  return (
    <div className={classes.customersListRoot}>
      {isDeleteModalOpen &&
        <DeleteModal
          modalHandler={modalHandler}
          title='حذف مشتری'
          question={`آیا از ترخیص ${modalName} اطمینان دارید؟`}
          type='customer'
          idToDelete={modalId}
          option='ترخیص'
        />
      }
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست مشتری‌ها</h3>
      </div>
      <input
        type="text"
        onChange={searchHandler}
        className={classes.search}
        placeholder='نام یا نام خانوادگی مشتری را وارد کنید ...'
      />
      {filteredCutomers.length !== 0 && (
        <div className={classes.headerRow}>
          <div className={classes.indexHeader}><span>شماره</span></div>
          <div className={classes.imgHeader}><span>تصویر</span></div>
          <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
          <div className={classes.joinDateHeader}><span>اعتبار(تومان)</span></div>
          <div className={classes.leaveDateHeader}><span>تاریخ ترخیص</span></div>
        </div>
      )}
      {customers.length === 0
        ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
        : (filteredCutomers.length === 0
          ? <span className={classes.noItem}>موردی یافت نشد!</span>
          : customers.map((customer, index) => (
            <div className={classes.customerRow} key={customer.id}>
              <div className={classes.indexContainer}><span>{dltf(index + 1)}</span></div>
              <div className={classes.imgContainer}>
                {customer.profile_photo_link
                  ? <img src={customer.profile_photo_link} alt={customer.name} />
                  : <div></div>
                }
              </div>
              <div className={classes.nameContainer}>
                <span>{customer.name}</span>
              </div>
              <div className={classes.creditContainer}>
                <span>{dltf(seperateByComma(customer.credit))}</span>
              </div>
              <div className={classes.leaveDateContainer}>
                <span>
                {customer.leave_date ? Intl.DateTimeFormat('fa', {year: 'numeric', month: '2-digit',day: '2-digit' }).format(customer.leave_date * 1000) : '-'}
                </span>
              </div>
              {customer.is_active
                ? (
                  <div className={classes.seeMoreContainer}>
                    {/* <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" /> */}
                    <button className={classes.btn} onClick={() => navigate('/edit-customer', { state: { id: customer.id } })}>ویرایش</button>
                    <button className={classes.btn} onClick={() => modalHandler(customer.id, customer.name)} style={{ marginRight: 10 }}>ترخیص</button>
                  </div>
                )
                : <span style={{ color: 'red', fontWeight: 800 }}>ترخیص شده</span>
              }
            </div>
          )))}
    </div>
  )
}

export default CustomersList
