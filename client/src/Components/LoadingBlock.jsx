import Loader from "./Loader"
import styles from '../styles/loading.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {hideLoadingAC} from "../reducers/loadingReducer"
import closeBtn from '../assets/close.svg'

const LoadingBlock = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.loading.isLoading)

    const loadingFiles = useSelector(state => state.loading.loadingFiles)

    return (<div>
            {isLoading && <div className={styles.loadingBlock}>

                <div className={styles.loadingBlock__header}>
                    <h2>Загрузка файлов</h2>
                    <div onClick={() => {
                        dispatch(hideLoadingAC())
                    }}><img src={closeBtn} alt="closeLoadingBtn"/>
                    </div>
                </div>

                <div className={styles.loadingBlock__content}>
                    {loadingFiles.map(file => <Loader props={{...file}}/>)}
                </div>

            </div>
            }
        </div>
    )
}

export default LoadingBlock