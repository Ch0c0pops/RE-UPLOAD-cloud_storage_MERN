import styles from '../styles/file.module.scss'
import dir from '../assets/dirLogo.svg'
import file from '../assets/fileLogo.svg'
import {useDispatch, useSelector} from "react-redux"
import {pushToStackAC, setCurrentDirAC} from "../reducers/fileReducer"
import downloadBtn from '../assets/download.svg'
import deleteBtn from '../assets/delete.svg'
import {deleteFile, downloadFile} from "../axios/fileActions"
import {sizeTranslator} from "../assets/helper functions/sizeTranslator"

const File = (props) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const viewType = useSelector(state => state.app.view)

    const enterDirHandler = () => {
        if (props.file.type === 'dir') {
            dispatch(setCurrentDirAC(props.file._id))
            dispatch(pushToStackAC(currentDir))
        }

    }
    const downloadHandler = (e) => {
        e.stopPropagation()
        downloadFile(props.file)
    }

    const deleteFileHandler = (e) => {
        e.stopPropagation()
        dispatch(deleteFile(props.file._id))
    }


    return (
        <div className={viewType === 'tile' ? styles.file__tile : styles.file} onClick={() => enterDirHandler()}>
            <img src={props.file.type === 'dir' ? dir : file} alt="#"/>
            <div className={styles.file_name}>{props.file.name}</div>

            {viewType === 'list' && <div className={styles.file_date}>{props.file.date.slice(0, 10)}</div>}
            {viewType === 'list' && <div className={styles.file_size}>{sizeTranslator(props.file.size)}</div>}


            {props.file.type !== 'dir' &&
            <div className={viewType === 'list' ? styles.file_download : styles.file_download_tile}
                 onClick={(e) => downloadHandler(e)}>
                <img src={downloadBtn} alt='downloadBtn'/>
            </div>}

            <div className={viewType === 'list' ? styles.file_delete : styles.file_delete_tile}
                 onClick={(e) => deleteFileHandler(e)}><img src={deleteBtn} alt='deleteBtn'/>
            </div>

        </div>
    )
}

export default File