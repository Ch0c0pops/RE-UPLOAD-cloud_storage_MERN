import React, {useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import styles from '../styles/registrationPage.module.scss'
import {Button} from "@material-ui/core"
import {register} from '../axios/userActions'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const classes = useStyles();

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
            <h1>Регистрация нового пользователя</h1>
            <TextField id="standard-basic" label="Email" value={email} onChange={emailChangeHandler}/>
            <TextField id="standard-basic" label="Пароль" type='password' value={password} onChange={passwordChangeHandler}/>
            <Button variant="contained" color="primary" onClick={() => register(email, password)}>
                Зарегистрировать пользователя
            </Button>
        </form>
    </div>
}
