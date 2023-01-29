import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getSellers from '../../services/getSellers.js'
import styles from './styles'
import dltf from '../../utilities/dltf.js'
import DeleteModal from '../../components/DeleteModal/index.jsx'
import { Waypoint } from 'react-waypoint'

const SellersList = () => {
  const [sellers, setSellers] = useState([])
  const [filteredSellers, setFilteredSellers] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [modalName, setModalName] = useState('')
  const [modalId, setModalId] = useState(null)
  const [isDataFinished, setIsDataFinished] = useState(false)
  const navigate = useNavigate()
  const classes = styles()

  useEffect(() => {
    getSellers(currentPage).then(res => {
      if (Array.isArray(res)) {
        if (res.length === 10) {
          setCurrentPage(currentPage + 1)
        } else {
          setIsDataFinished(true)
        }

        setSellers(res.reverse())
      }
    })
  }, [])

  useEffect(() => {
    if (searchedText) {
      setFilteredSellers(
        sellers.filter(seller => seller.name.includes(searchedText) || seller.username.includes(searchedText))
      )
    } else {
      setFilteredSellers(sellers)
    }
  }, [searchedText, sellers])

  const onReachEnd = () => {
    if (currentPage > 1) {
      getSellers(currentPage).then(res => {
        if (Array.isArray(res)) {
          if (res.length === 10) {
            setCurrentPage(currentPage + 1)
          } else {
            setIsDataFinished(true)
          }

          setSellers((prevState) => ([...prevState, ...res]))
        }
      })
    }
  }

  const searchHandler = (e) => {
    setSearchedText(e.target.value)
  }

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
          title='غیرفعال کردن فروشنده'
          question={`آیا از غیرفعال کردن ${modalName} اطمینان دارید؟`}
          type='seller'
          idToDelete={modalId}
          option='غیرفعال کردن'
        />
      }
      <div className={classes.pageHeader}>
        <img src="./asset/images/back.png" alt="بازگشت" title='بازگشت' onClick={() => navigate(-1)} />
        <h3 className={classes.pageTitle}>لیست فروشندگان</h3>
      </div>
      <input
        type="text"
        onChange={searchHandler}
        className={classes.search}
        placeholder='نام یا نام خانوادگی یا نام کاربری فروشنده را وارد کنید ...'
      />
      {filteredSellers.length !== 0 && (
        <div className={classes.headerRow}>
          <div className={classes.indexHeader}><span>شماره</span></div>
          <div className={classes.imgHeader}><span>تصویر</span></div>
          <div className={classes.nameHeader}><span>نام و نام خانوادگی</span></div>
          <div className={classes.usernameHeader}><span>نام کاربری</span></div>
        </div>
      )}
      {sellers.length === 0
        ? <span className={classes.noItem}>در حال دریافت اطلاعات ...</span>
        : (filteredSellers.length === 0
            ? <span className={classes.noItem}>موردی یافت نشد!</span>
            : filteredSellers.map((seller, index) => (
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
                  {seller.is_active
                    ? (
                      <div className={classes.seeMoreContainer}>
                      {/* <img src="./asset/images/chevron-left.png" alt="مشاهده بیشتر" title="مشاهده بیشتر" /> */}
                        <button className={classes.btn} onClick={() => navigate('/edit-seller', { state: { id: seller.id } })}>ویرایش</button>
                        <button className={classes.btn} onClick={() => modalHandler(seller.id, seller.name)} style={{ marginRight: 10 }}>غیرفعال کردن</button>
                      </div>
                    )
                    : <span style={{ color: 'red', fontWeight: 800 }}>غیر فعال</span>
                  }
                </div>
              ))
          )
      }
      {!isDataFinished &&
        <Waypoint onEnter={onReachEnd} bottomOffset={'-20%'}/>
      }
    </div>
  )
}

export default SellersList
