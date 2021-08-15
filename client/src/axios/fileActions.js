import axios from "axios"
import {createDirAC, deleteFileAC, getFilesAC} from "../reducers/fileReducer"
import {addLoadingFileAC, setLoadingProgressionAC, showLoadingAC} from "../reducers/loadingReducer"
import {hideLoaderAC, showLoaderAC} from "../reducers/appReducer"
import {HEROKU_URL} from "../config";

export const getFiles = (dirId, sortMethod) => async (dispatch) => {
    let url = `${HEROKU_URL}/api/files/`

    try {
        dispatch(showLoaderAC())
        if (dirId) {
            url = `${HEROKU_URL}/api/files/?parent=${dirId}`
        }
        if (sortMethod) {
            url = `${HEROKU_URL}/api/files/?sort=${sortMethod}`
        }
        if (dirId && sortMethod) {
            url = `${HEROKU_URL}/api/files/?parent=${dirId}&sort=${sortMethod}`
        }

        const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        dispatch(getFilesAC(response.data))
    } catch (e) {
        alert(e.response.data.message)
    } finally {
        dispatch(hideLoaderAC())
    }

}

export const createDir = (dirId, name) => async (dispatch) => {
    try {
        const response = await axios.post(`${HEROKU_URL}/api/files`, {
                name,
                type: 'dir',
                parent: dirId
            },
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        dispatch(createDirAC(response.data))

    } catch (e) {

        alert(e.response.data.message)
    }

}

export const uploadFile = (file, dirId) => async (dispatch) => {

    try {

        const formData = new FormData()
        formData.append('file', file)
        if (dirId) {
            formData.append('parent', dirId)
        }

        const loadingFile = {id: Date.now(), progress: 0, name: file.name}

        dispatch(showLoadingAC())
        dispatch(addLoadingFileAC(loadingFile))

        const response = await axios.post(`${HEROKU_URL}/api/files/upload`, formData,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if (totalLength) {
                        loadingFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(setLoadingProgressionAC(loadingFile))
                    }
                }
            })
        dispatch(createDirAC(response.data))

    } catch (e) {

        alert(e.response.data.message)
    }

}

export const downloadFile = async (file) => {
    const response = await fetch(`${HEROKU_URL}/api/files/download?id=${file._id}`,
        {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

    if (response.status === 200) {
        const blob = await response.blob()
        const downloadURL = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadURL
        link.download = file.name
        document.body.append(link)
        link.click()
        link.remove()
    }

}


export const deleteFile = (id) => async (dispatch) => {
    try {
        const response = await axios.delete(`${HEROKU_URL}/api/files/?id=${id}`,
            {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
        dispatch(deleteFileAC(id))
        alert(response.data.message)
    } catch (e) {
        alert(e.response.data.message)
    }

}

export const searchFiles = (searchParam, currentDir) => async (dispatch) => {

    if (!searchParam){
        dispatch(getFiles(currentDir))
        return;
    }

      let url = `${HEROKU_URL}/api/files/search?searchParam=${searchParam}`

    try {
        const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })

        console.log('resp:', response.data)
        dispatch(getFilesAC(response.data))

    } catch (e) {
        alert(e.response.data.message)
    } finally {
        dispatch(hideLoaderAC())
    }

}