import React from "react"
import styles from './styles'


const NavLink = () => {
  const classes = styles()
  
  return (
    <>
    <div className={classes.navLinksContainer}/>
    <div className={classes.linksWrapper}/>
    <div className={classes.linkItem}/>
    <div className={classes.link}/>
    </>
  )
}

export default NavLink
