import { FunctionComponent, useRef } from 'react'
import styles from './List.less'

const Item: FunctionComponent<{ todo: string }> = ({ todo }) => {
  return (
    <div className={styles.item}>
      <div>{todo}</div>
    </div>
  )
}

export const List: FunctionComponent<{
  todos: string[]
  setCurrentPage?: () => void
  buttonText?: string
}> = ({ todos, setCurrentPage, buttonText = '点击加载更多' }) => {
  //判断滚动并处理
  const listRef = useRef<HTMLDivElement>(null)
  const handleIfScroll = () => {
    if (!!listRef.current) {
      const clientHeight = listRef.current.clientHeight
      const scrollTop = listRef.current.scrollTop
      const scrollHeight = listRef.current.scrollHeight
      if (clientHeight + scrollTop >= scrollHeight) {
        console.log('请点击加载更多按钮')
      }
    }
  }

  //点击加载更多
  const handleLoadMoreClick = () => {
    if (setCurrentPage instanceof Function) {
      setCurrentPage()
    }
  }

  return (
    <div className={styles.list}>
      <div ref={listRef} onScroll={(e) => handleIfScroll()} className={styles.listContent}>
        {todos.map((item, index) => {
          return <Item key={index} todo={item}></Item>
        })}
      </div>

      <div className={styles.button}>
        <button disabled={buttonText == '正在加载中'} onClick={(e) => handleLoadMoreClick()}>
          {buttonText}
        </button>
      </div>
    </div>
  )
}
