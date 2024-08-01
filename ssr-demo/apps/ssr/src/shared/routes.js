import { Layout } from './components/Layout'
import { Hello } from './components/Hello'
import { Me } from './components/Me'

export const routes = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <Hello></Hello>,
        // ssr时通过loader共享请求，csg没有必要
        loader() {
          console.log('我是Hello的请求')
          return new Promise((resolve, reject) =>
            setTimeout(() => resolve({ message: 'promise hello hhx' }), 1000),
          )
        },
      },
      {
        path: '/me',
        element: <Me></Me>,
      },
    ],
  },
]
