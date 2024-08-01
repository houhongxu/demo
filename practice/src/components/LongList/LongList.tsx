import { useEffect, useState } from 'react'
import { randomStringArrayApi } from '@/utils'
import { constConfig } from '@/configs/constant'
import { List } from '@/components/List'

export const LongList = () => {
  //初始化数据
  const [todos, setTodos] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [total, setTotal] = useState(0)

  const buttonText = isLoading
    ? '正在加载中'
    : currentPage * constConfig.page.PAGE_SIZE >= total
    ? '没有更多了'
    : '点击加载更多'

  //请求数据
  useEffect(() => {
    const request = async () => {
      const { list, total } = await randomStringArrayApi(currentPage, constConfig.page.PAGE_SIZE)
      setIsLoading(false)
      setTotal(total)
      setTodos([...todos, ...list])
    }
    setIsLoading(true)
    request()
  }, [currentPage])

  return <List setCurrentPage={() => setCurrentPage(currentPage + 1)} todos={todos} buttonText={buttonText}></List>
}
