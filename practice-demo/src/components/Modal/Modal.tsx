import { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.less'

const modalDOM = document.getElementById('modal') as HTMLDivElement

export const Modal: FunctionComponent<{ isShow: boolean; close: () => void }> = ({ isShow, close }) => {
  const handleCloseClick = () => close()

  return ReactDOM.createPortal(
    <div className={styles.wrapper} style={{ visibility: isShow ? 'visible' : 'hidden' }}>
      <div className={styles.overlay} style={{ backgroundColor: isShow ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0)' }}></div>

      <div className={styles.card} style={{ opacity: isShow ? '1' : '0' }}>
        <p>请确认是否删除</p>
        <div>
          <button onClick={(e) => handleCloseClick()}>确认</button>
        </div>
      </div>
    </div>,
    modalDOM
  )
}
