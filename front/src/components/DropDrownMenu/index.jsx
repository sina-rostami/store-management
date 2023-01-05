import React from 'react';
import styles from './styles';
import { useAuthDispatch } from '../../context/index.js'
import noop from 'lodash/noop'

function DropDownMenu(props){

    const classes = styles()

    const authDispatch = useAuthDispatch()

    const logoutHandler = () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('role')
        authDispatch({ type: 'logout' })
    }

    function DropDownItem({ clickHandler, children }){
        return(
            <li onClick={clickHandler?clickHandler:noop}>
                {children}
            </li>
        )
    }
    return(
        <div className= {classes.dropDownMenuContainer}>
            <ul className={classes.items}>
            <DropDownItem className={classes.menuItem}>My Profile</DropDownItem>
            <DropDownItem clickHandler={logoutHandler} className={classes.menuItem}>
                    خروج            
            </DropDownItem>
            </ul>
        </div>
    )
}

export default DropDownMenu