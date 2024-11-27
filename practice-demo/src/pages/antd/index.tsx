import { DeleteOutlined } from '@ant-design/icons'
import { Comment, Button, Input, Avatar, Tooltip } from 'antd'
import { useState } from 'react'
const { TextArea } = Input

const CommentInput = (props: any) => {
  const [content, setContent] = useState('')

  const handleInputChange = (e: any) => {
    if (e.target.value) {
      setContent(e.target.value)
    }
  }
  const handleButtonClick = (e: any) => {
    if (!!content) {
      const comment = {
        id: Date.now(),
        avator: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        nickname: 'hhx',
        datetime: Date.now(),
        content: content,
      }
      props.submitComment(comment)
      setContent('')
    }
  }
  return (
    <div>
      <TextArea value={content} onChange={(e) => handleInputChange(e)} rows={4}></TextArea>
      <Button type='primary' onClick={(e) => handleButtonClick(e)}>
        评论
      </Button>
    </div>
  )
}

const CommentItem = (props: any) => {
  const { nickname, avator, content, datetime } = props.comment
  const handleDeleteClick = (e: any) => {
    props.removeComment()
  }
  return (
    <Comment
      author={<a>{nickname}</a>}
      avatar={<Avatar src={avator} alt={nickname} />}
      content={<p>{content}</p>}
      datetime={
        <Tooltip title={datetime}>
          <span></span>
        </Tooltip>
      }
      actions={[
        <span onClick={(e) => handleDeleteClick(e)}>
          <DeleteOutlined></DeleteOutlined>删除
        </span>,
      ]}
    />
  )
}

//----------
import { useDebounce } from '@/hooks/useDebounce'

const DebounceDemo = () => {
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce(value, { wait: 1000 })

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Typed value' style={{ width: 280 }} />
      <p style={{ marginTop: 16 }}>DebouncedValue: {debouncedValue}</p>
    </div>
  )
}
//----------
import { useThrottle } from 'ahooks'

const ThrottleDemo = () => {
  const [value, setValue] = useState<string>('')
  const throttledValue = useThrottle(value, { wait: 1000 })

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Typed value' style={{ width: 280 }} />
      <p style={{ marginTop: 16 }}>throttledValue: {throttledValue}</p>
    </div>
  )
}
//----------
import { useLocalStorageState } from 'ahooks'

const LocalStorageDemo = () => {
  const [message, setMessage] = useLocalStorageState('use-local-storage-state-demo1', {
    defaultValue: 'Hello~',
  })

  return (
    <>
      <input value={message || ''} placeholder='Please enter some words...' onChange={(e) => setMessage(e.target.value)} />
      <button style={{ margin: '0 8px' }} type='button' onClick={() => setMessage('Hello~')}>
        Reset
      </button>
      <button type='button' onClick={() => setMessage()}>
        Clear
      </button>
    </>
  )
}
//----------
import { useCountdown } from '@/hooks/useCountdown'

const CountdownDemo = () => {
  const [localCount, refresh] = useCountdown(3)

  return (
    <div>
      <p>{localCount}</p>
      <button onClick={() => refresh()}>重置</button>
    </div>
  )
}
//----------
import { useLazy } from '@/hooks/useLazy'
import { useRef } from 'react'

const LazyDemo = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)
  useLazy(() => {
    setShow(true)
  }, ref)
  return (
    <div>
      <div style={{ width: '500px', height: '800px', backgroundColor: 'blue' }}></div>
      <div className='scrollerFooter' ref={ref}>
        {show && (
          <img
            src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'
            style={{ width: '500px', height: '100px', backgroundColor: 'red' }}
          ></img>
        )}
      </div>
      <div style={{ width: '500px', height: '800px', backgroundColor: 'green' }}></div>
    </div>
  )
}
//----------
import { useRequest } from '@/hooks/useRequest'
import Mock from 'mockjs'

function getUsername(id: number): Promise<string> {
  console.log('use-request-refresh-id', id)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'))
    }, 1000)
  })
}

const RequestDemo = () => {
  const { data, loading, run, refresh } = useRequest((id) => getUsername(id))
  return (
    <div>
      <p>name:{data}</p>
      <button disabled={loading} type='button' onClick={() => run(1)}>
        {loading ? 'Loading' : 'Run'}
      </button>
      <button disabled={loading} type='button' onClick={() => refresh()}>
        {loading ? 'Loading' : 'Refresh'}
      </button>
    </div>
  )
}
//----------

export default function Antd() {
  const [commmentList, setCommentList] = useState<Array<{ id: number }>>([])
  const submitComment = (comment: any) => {
    setCommentList([...commmentList, comment])
  }
  const removeComment = (index: number) => {
    const newCommentList = [...commmentList]
    newCommentList.splice(index, 1)
    setCommentList(newCommentList)
  }
  return (
    <div style={{ width: '500px', padding: '20px' }}>
      {commmentList.map((item, index) => {
        return <CommentItem key={item.id} comment={item} removeComment={() => removeComment(index)}></CommentItem>
      })}
      <CommentInput submitComment={submitComment}></CommentInput>
      <div>
        <br></br>
        <DebounceDemo></DebounceDemo>
        <br></br>
        <ThrottleDemo></ThrottleDemo>
        <br></br>
        <LocalStorageDemo></LocalStorageDemo>
        <br></br>
        <CountdownDemo></CountdownDemo>
        <br></br>
        <RequestDemo></RequestDemo>
        <br></br>
        <LazyDemo></LazyDemo>
        <br></br>
      </div>
    </div>
  )
}
