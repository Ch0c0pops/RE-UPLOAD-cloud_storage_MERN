import styles from '../styles/loading.module.scss'
import {useDispatch} from "react-redux"
import {deleteLoadingAC} from "../reducers/loadingReducer"

const Loader = (props) => {
const dispatch = useDispatch()

    return <div className={styles.loader}>


       <div className={styles.loader__progressBar} style={{'width': props.props.progress + '%'}}>
           {props.props.name}
       </div>

        <div className={styles.loader__progressPercent}>
            {props.props.progress + '%'}
        </div>

        <button className={styles.loader__closeBtn} onClick={()=> dispatch(deleteLoadingAC(props.props.id))}>X</button>


    </div>


}

export default Loader