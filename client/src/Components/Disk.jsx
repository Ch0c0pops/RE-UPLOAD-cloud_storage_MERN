import {useDispatch, useSelector} from "react-redux"
import {useEffect, useState} from "react"
import {createDir, getFiles, searchFiles, uploadFile} from "../axios/fileActions"
import FileList from "./FileList"
import styles from '../styles/diskPage.module.scss'
import PopUpWindow from "./PopUpWindow"
import {setCurrentDirAC} from "../reducers/fileReducer"
import LoadingBlock from "./LoadingBlock"
import {showLoaderAC, viewListAC, viewTileAC} from "../reducers/appReducer"
import tile from '../assets/tile.svg'
import list from '../assets/list.svg'


const Disk = (props) => {
    const isAuth = useSelector(state=>state.users.isAuth)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const viewType = useSelector(state => state.app.view)
    const [popUp, setPopUp] = useState(false)
    const [showDrop, setShowDrop] = useState(false)
    const [sortMethod, setSortMethod] = useState('')
    const [searchInputValue, setSearchInputValue] = useState('')
    const [searchTimeOut, setSearchTimeOut] = useState(false)

    useEffect(() => {

            dispatch(getFiles(currentDir, sortMethod))

    }, [isAuth, currentDir, sortMethod])


    const createHandler = (name) => {
        dispatch(createDir(currentDir, name))
        setPopUp(false)
    }
    const closePopUp = () => {
        setPopUp(false)
    }

    const leaveDirHandler = () => {
        const prevDir = dirStack.pop()
        dispatch(setCurrentDirAC(prevDir))
    }

    const uploadFileHandler = (e) => {
        const files = [...e.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))

    }

    const onDropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const files = [...e.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setShowDrop(false)

    }
    const onDragEnterHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShowDrop(true)
    }
    const onDragLeaveHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setShowDrop(false)
    }


    const searchHandler = (e, currentDir) => {
        e.preventDefault()
        e.stopPropagation()
        setSearchInputValue(e.target.value)
        dispatch(showLoaderAC())
        if (searchTimeOut !== false) {
            clearTimeout(searchTimeOut)
        }
        setSearchTimeOut(setTimeout(() => dispatch(searchFiles(e.target.value, currentDir)), 1000))
        //???????????????????? ???????????? ???????????????????????? ???????????????? ???? ???????????? ?????? ?????????? ???????????????????? ?????????????? (????????????)
    }

    const viewHandler = (e, view) => {
        e.preventDefault()
        e.stopPropagation()
        if (view === 'tile') {
            dispatch(viewTileAC())
        }
        if(view === 'list'){
            dispatch(viewListAC())
        }

    }

    if (viewType === 'tile') {
        return (
            <div>
                {!showDrop ?

                    <div>

                        <div className={styles.disk}
                             onDrop={onDropHandler}
                             onDragEnter={onDragEnterHandler}
                             onDragLeave={onDragLeaveHandler}
                             onDragOver={onDragEnterHandler}>
                            {!popUp &&
                            <div>
                                <div className={styles.disk__buttonBlock}>
                                    <button onClick={() => leaveDirHandler()}>??????????</button>
                                    <button onClick={() => setPopUp(true)}>?????????????? ??????????</button>

                                    <div className={styles.disk__buttonBlock_upload}>
                                        <label htmlFor="upload_file">?????????????????? ????????</label>
                                        <input onChange={(e) => uploadFileHandler(e)} id='upload_file' type="file"
                                               multiple={true}/>
                                    </div>

                                    <select className={styles.disk__buttonBlock_sort} name='????????????????????'
                                            onChange={event => setSortMethod(event.target.value)}>
                                        <option value='name'>???? ????????????????</option>
                                        <option value='date'>???? ????????</option>
                                        <option value='type'> ???? ????????</option>
                                    </select>

                                    <div className={styles.disk__buttonBlock_search}>
                                        <input placeholder='?????????? ??????????' value={searchInputValue}
                                               onChange={event => searchHandler(event)} type="text"/>
                                    </div>

                                    <div className={styles.disk__buttonBlock_viewBlock}>
                                        <div onClick={(e) => viewHandler(e, 'list')}>
                                            <img src={list} alt="list"/>
                                        </div>
                                        <div onClick={(e) => viewHandler(e, 'tile')}>
                                            <img src={tile} alt="tile"/>
                                        </div>
                                    </div>

                                </div>

                                <div className={styles.disk__files_tile}>
                                    <FileList/>
                                </div>

                            </div>}

                        </div>
                        {popUp && <PopUpWindow createHandler={createHandler} closePopUp={closePopUp}/>}
                    </div>

                    :

                    <div className={styles.disk__drop} onDrop={onDropHandler} onDragEnter={onDragEnterHandler}
                         onDragLeave={onDragLeaveHandler}
                         onDragOver={onDragEnterHandler}>???????????????????? ?????????? ????????
                    </div>
                }

                <LoadingBlock/>

            </div>


        )
    }

    return (
        <div>
            {!showDrop ?

                <div>

                    <div className={styles.disk}
                         onDrop={onDropHandler}
                         onDragEnter={onDragEnterHandler}
                         onDragLeave={onDragLeaveHandler}
                         onDragOver={onDragEnterHandler}>
                        {!popUp &&
                        <div>
                            <div className={styles.disk__buttonBlock}>
                                <button onClick={() => leaveDirHandler()}>??????????</button>
                                <button onClick={() => setPopUp(true)}>?????????????? ??????????</button>
                                <div className={styles.disk__buttonBlock_upload}>
                                    <label htmlFor="upload_file">?????????????????? ????????</label>
                                    <input onChange={(e) => uploadFileHandler(e)} id='upload_file' type="file"
                                           multiple={true}/>
                                </div>

                                <select className={styles.disk__buttonBlock_sort} name='????????????????????'
                                        onChange={event => setSortMethod(event.target.value)}>
                                    <option value='name'>???? ????????????????</option>
                                    <option value='date'>???? ????????</option>
                                    <option value='type'>???? ????????</option>
                                </select>

                                <div className={styles.disk__buttonBlock_search}>
                                    <input placeholder='?????????? ??????????' value={searchInputValue}
                                           onChange={event => searchHandler(event)} type="text"/>
                                </div>

                                <div className={styles.disk__buttonBlock_viewBlock}>
                                    <div onClick={(e) => viewHandler(e, 'list')}>
                                        <img src={list} alt="list"/>
                                    </div>
                                    <div onClick={(e) => viewHandler(e, 'tile')}>
                                        <img src={tile} alt="tile"/>
                                    </div>
                                </div>

                            </div>

                            <div className={styles.disk__fileList}>
                                <div className={styles.disk__fileList_header}>
                                    <div className={styles.disk__fileList_header_name}>????????????????</div>
                                    <div className={styles.disk__fileList_header_date}>????????</div>
                                    <div className={styles.disk__fileList_header_size}>????????????</div>
                                </div>
                            </div>

                            <div className={styles.disk__files}>
                                <FileList/>
                            </div>

                        </div>}

                    </div>
                    {popUp && <PopUpWindow createHandler={createHandler} closePopUp={closePopUp}/>}
                </div>

                :

                <div className={styles.disk__drop} onDrop={onDropHandler} onDragEnter={onDragEnterHandler}
                     onDragLeave={onDragLeaveHandler}
                     onDragOver={onDragEnterHandler}>???????????????????? ?????????? ????????
                </div>
            }

            <LoadingBlock/>

        </div>

    )
}

export default Disk