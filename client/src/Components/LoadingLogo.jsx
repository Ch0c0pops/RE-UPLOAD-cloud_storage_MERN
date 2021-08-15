import styles from '../styles/loading_logo.module.scss'

const LoadingLogo = () => {

    return <div className={styles.loader}>

        <div className={styles.loader__lds}>
            <div></div>
            <div></div>
            <div></div>
        </div>

    </div>



}

export default LoadingLogo