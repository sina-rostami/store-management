import React from 'react';
import styles from './styles';
import { useAuthDispatch } from '../../context/index.js'
import noop from 'lodash/noop'
import { useNavigate } from 'react-router-dom'

function DropDownItem({ clickHandler, children }) {
    const classes = styles()

    return(
        <li className={classes.listItem} onClick={clickHandler ? clickHandler : noop}>
            {children}
        </li>
    )
}

function DropDownMenu({ name, role, username }) {
    const authDispatch = useAuthDispatch()
    const navigate = useNavigate()
    const classes = styles()

    const logoutHandler = () => {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('role')
        authDispatch({ type: 'logout' })
    }

    return(
        <div className= {classes.dropDownMenuContainer}>
            <ul className={classes.items}>
                <span className={classes.name}><b>{name}</b></span>
                {role === 'admin' &&
                    <DropDownItem
                        clickHandler={() => navigate('/edit-admin', { state: { username } })}
                        className={classes.menuItem}>
                            ویرایش ادمین
                    </DropDownItem>
                }
                <DropDownItem clickHandler={logoutHandler} className={classes.menuItem}>خروج</DropDownItem>
            </ul>
        </div>
    )
}

export default DropDownMenu