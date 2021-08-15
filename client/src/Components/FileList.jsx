import {useSelector} from "react-redux"
import File from '../Components/File'
import styles from '../styles/loading_logo.module.scss'
import LoadingLogo from "./LoadingLogo"
import styles2 from '../styles/file.module.scss'

const FileList = () => {

    const viewType = useSelector(state=> state.app.view)
    const loading = useSelector(state => state.app.isLoading)
    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>)

    if (files.length === 0) {
        return <div className={styles.loader}><h1>Файлов пока нет</h1></div>
    }

    return (

        <div className={viewType === 'tile' && styles2.fileWrapper}> {loading? <LoadingLogo/> : files}</div>
    )
}

export default FileList