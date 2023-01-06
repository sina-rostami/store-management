import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getSellers from '../../services/getSellers.js'
import styles from './styles'
import dltf from '../../utilities/dltf.js'
import DeleteModal from '../../components/DeleteModal/index.jsx'

const SellersList = () => {
  const [sellers, setSellers] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalId, setModalId] = useState(null)
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getSellers().then(res =>{
      if (Array.isArray(res)) {
        setSellers(res.reverse())
      }
    })
  }, [])

  const modalHandler = (id = null, name = '') => {
    setModalName(name)
    setModalId(id)
    setIsDeleteModalOpen(prev => !prev)
  }

  return (
    <div className={classes.sellersListRoot}>
      {isDeleteModalOpen &&
        <DeleteModal
          modalHandler={modalHandler}
          title='حذف فروشنده'
          question={`آیا از حذف ${modalName} اطمینان دارید؟`}
          type='seller'
          idToDelete={modalId}
        />
      }
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست فروشندگان</h3>
      </div>
      <div className={classes.headerRow}>
        <div className={classes.indexHeader}><span>شماره</span></div>
        <div className={classes.imgHeader}><span>تصویر</span></div>
        <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
        <div className={classes.usernameHeader}><span>نام کاربری</span></div>
      </div>
      {sellers.length === 0
        ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
        : sellers.map((seller, index) => (
          <div className={classes.sellersRow} key={seller.id}>
            <div className={classes.indexContainer}><span>{dltf(index + 1)}</span></div>
            <div className={classes.imgContainer}>
              {seller.profile_photo_link
                ? <img src={seller.profile_photo_link} alt={seller.name} />
                : <div></div>
              }
            </div>
            <div className={classes.nameContainer}>
              <span>{seller.name}</span>
            </div>
            <div className={classes.usernameContainer}>
              <span>{seller.username}</span>
            </div>
            <div className={classes.seeMoreContainer}>
              {/* <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" /> */}
              <button className={classes.btn} onClick={() => navigate('/edit-seller', { state: { id: seller.id } })}>ویرایش</button>
              <button className={classes.btn} onClick={() => modalHandler(seller.id, seller.name)} style={{ marginRight: 10 }}>حذف</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default SellersList
