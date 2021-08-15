import styles from '../styles/popUpWindow.module.scss'
import {useState} from "react"
import closeBtn from '../assets/close.svg'

const PopUpWindow = (props) => {

const [value, setValue] = useState('')

    return (
        <div className={styles.popUp}>

            <div className={styles.mainFrame}>

                <div className={styles.mainFrame__header}>
                    <h2>Создать новую директорию</h2>
                    <div className={styles.mainFrame__header_close} onClick={()=>props.closePopUp()}><img src={closeBtn} alt="close"/></div>
                    {/*<button onClick={()=>props.closePopUp()}>x</button>*/}
                </div>

                <div className={styles.mainFrame__content}>
                    <input value={value} placeholder='Название' onChange={(e)=>setValue(e.target.value)}/>

                    <button onClick={()=>props.createHandler(value)}>Создать</button>
                </div>


            </div>

        </div>
    )
}

export default PopUpWindow