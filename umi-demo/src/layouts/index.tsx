import { Link, Outlet } from 'umi';

export default function Layout() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {!document.cookie.includes('token') && <Link to="/login">Login</Link>}
        </li>
        <li>
          <Link to="/posts/create">Create</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
