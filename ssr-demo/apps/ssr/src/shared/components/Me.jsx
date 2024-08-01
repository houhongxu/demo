import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function Me() {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = () => {
      console.log('我是Me的请求')
      return new Promise((resolve, reject) =>
        setTimeout(() => resolve({ message: 'promise me' }), 1000),
      )
    }

    run().then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          {data.message || 'me'} <Link to={'/'}>go to home</Link>
        </div>
      )}
    </div>
  )
}
