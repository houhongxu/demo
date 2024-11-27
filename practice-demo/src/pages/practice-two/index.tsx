import { Modal } from '@/components/Modal'
import { useState } from 'react'

export default function PracticeTwo() {
  const [isShow, setIsShow] = useState(false)

  return (
    <div>
      <button onClick={(e) => setIsShow(!isShow)}>删除todo</button>
      <Modal
        isShow={isShow}
        close={() => {
          setIsShow(false)
        }}
      ></Modal>
    </div>
  )
}
