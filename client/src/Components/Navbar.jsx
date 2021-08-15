import React from 'react'
import Tab from '@material-ui/core/Tab'
import {useDispatch, useSelector} from "react-redux"
import {NavLink} from "react-router-dom"
import {logoutAC} from "../reducers/usersReducer"
import user_avatar from '../assets/user_avatar.svg'
import {HEROKU_URL} from "../config.js"
import styles from '../styles/nav.module.scss'

const Navbar = () => {

    const user = useSelector(state => state.users.currentUser)
    const isAuth = useSelector((state) => state.users.isAuth)
    const [value, setValue] = React.useState(0);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={styles.nav}>
            {!isAuth && <NavLink to='/login'><Tab label="Войти"/></NavLink>}
            {!isAuth && <NavLink to='/registration'><Tab label="Зарегистрироваться"/></NavLink>}
            {isAuth && <Tab label="Выйти" onClick={() => dispatch(logoutAC())}/>}
            {isAuth && <NavLink to='/profile'>
                <div className={styles.nav__avatar}><img src={user.avatar ? `${HEROKU_URL}\\${user.avatar}` : user_avatar}/></div>
            </NavLink>}
        </div>
    );
}

export default Navbar
