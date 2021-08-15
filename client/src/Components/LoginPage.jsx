import styles from '../styles/registrationPage.module.scss'
import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {Button} from "@material-ui/core"
import {login} from '../axios/userActions'
import {useDispatch} from "react-redux"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();
    const dispatch = useDispatch();

    const emailChangeHandler = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }
    const passwordChangeHandler = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }
    return <div className={styles.registration}>
        <form className={classes.root} noValidate autoComplete="off">
            <h1>Форма входа</h1>
            <TextField id="standard-basic" label="Email" value={email} onChange={emailChangeHandler}/>
            <TextField id="standard-basic" label="Пароль" type='password' value={password} onChange={passwordChangeHandler}/>
            <Button variant="contained" color="primary" onClick={() => dispatch(login(email, password))}>
                Войти
            </Button>
        </form>
    </div>
}

export default LoginPage
