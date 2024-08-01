import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Hello() {
  const data = useLoaderData()

  return (
    <div>
      {data.message || 'hello'} <Link to={'/me'}>go to me</Link>
    </div>
  )
}
