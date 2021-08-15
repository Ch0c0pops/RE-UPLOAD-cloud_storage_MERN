import styles from '../styles/profile.module.scss'
import {useDispatch} from "react-redux"
import {deleteAvatar, uploadAvatar} from "../axios/userActions"
import returnBtn from '../assets/return.svg'
import {NavLink} from "react-router-dom"

const Profile = () => {
    const dispatch = useDispatch()


    const uploadAvatarHandler = (e) => {
        e.preventDefault()
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))

    }
    const deleteAvatarHandler = () => {
        dispatch(deleteAvatar())
    }

    return (
        <div className={styles.profile}>

            <div className={styles.profile__returnBtn}>
                <NavLink to='/'>
                    <img src={returnBtn} alt="returnBtn"/>
                </NavLink>
            </div>

            <div className={styles.profile__input}>
                <label htmlFor="upload_avatar">Загрузить аватар</label>
                <input accept="image/*" onChange={e => uploadAvatarHandler(e)} id='upload_avatar' type="file"/>
            </div>

            <button onClick={() => deleteAvatarHandler()}>Удалить аватар</button>
        </div>
    );
};

export default Profile