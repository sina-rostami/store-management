import React from 'react';
import styles from './styles';

function DropDownMenu(props){

    const classes = styles()

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
            <DropDownItem>
                {/* <Exit onClick={logoutHandler}>
                    خروج            
                </Exit> */}
            </DropDownItem>
        </div>
    )
}

export default DropDownMenu