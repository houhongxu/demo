import { useFetcher } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div style={{ background: 'aliceblue', padding: '20px' }}>
      <Outlet></Outlet>
    </div>
  )
}
