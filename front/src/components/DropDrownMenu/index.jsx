import React from 'react';
import styles from './styles';
import { useAuthDispatch } from '../../context/index.js'


function DropDownMenu(props){

    const classes = styles()

    const authDispatch = useAuthDispatch()

    const logoutHandler = () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('role')
        authDispatch({ type: 'logout' })
    }

    function DropDownItem(props){
        return(
            <h1 href="#" className='menu-item'>
                <span className='icon-button'> {props.leftIcon} </span>
                {props.children}
                <span className='icon-right'> {props.rightIcon} </span>
            </h1>
        )
    }
    return(
        <div className= {classes.dropDownMenuContainer}>
            <DropDownItem className={classes.menuItem}>My Profile</DropDownItem>
            <DropDownItem onClick={logoutHandler}>
                    خروج            
            </DropDownItem>
        </div>
    )
}

export default DropDownMenu