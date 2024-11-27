import { List } from '@/components/List'
import { randomStringArrayApi } from '@/utils'
import { useEffect, useState } from 'react'

export default function PracticeOne() {
  const [todos, setTodos] = useState<string[]>([])

  useEffect(() => {
    const request = async () => {
      const { list, total } = await randomStringArrayApi(1, 10)
      setTodos(list)
    }
    request()
  }, [])

  return (
    <div>
      <List todos={todos}></List>
    </div>
  )
}
