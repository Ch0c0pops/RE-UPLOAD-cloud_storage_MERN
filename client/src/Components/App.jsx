import Navbar from "./Navbar"
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom"
import {RegisterPage} from "./RegisterPage"
import {LoginPage} from "./LoginPage"
import {useSelector, useDispatch} from "react-redux"
import {useEffect} from "react"
import {auth} from "../axios/userActions"
import Disk from "./Disk"
import Profile from "./Profile"
import styles from '../styles/app.module.scss'


function App() {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.users.isAuth)

    useEffect(() => {
        dispatch(auth())
    }, [])

    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Navbar/>
                {!isAuth ?
                    <Switch>
                        <Route path='/registration' component={RegisterPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Redirect to='/login'/>
                    </Switch>
                    :
                    <Switch>
                        <Route exact path='/' component={Disk}/>
                        <Route path='/profile' component={Profile}/>
                        <Redirect to='/'/>
                    </Switch>
                }

            </BrowserRouter>

        </div>
    )
}

export default App
