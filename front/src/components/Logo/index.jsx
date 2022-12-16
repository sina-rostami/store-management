import React from 'react'
import LogoImg from '../../../public/asset/images/logo.png'


import styles from './styles'

const Logo = () => {
  const classes = styles()
  
  return (
    <>
    <img className={classes.logoImg} src={LogoImg} />
    <div className={classes.logoText}/>
    <div className={classes.logoWrapper}>
    </div>
    </>
  )
}

export default Logo
