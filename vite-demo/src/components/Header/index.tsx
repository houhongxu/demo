import { useEffect } from 'react'
import styles from './index.module.scss'
import logoSrc from '@assets/imgs/vite.png'
import { ReactComponent as ReactLogo } from '@assets/icons/logo.svg'

// 批量引入svg因为影响网络性能所以优化为雪碧图
// const icons = import.meta.glob('../../assets/icons/logo-*.svg', { eager: true })
// const iconNames = Object.values(icons).map((module: any) => {
//   const fileName = module.default.split('/').pop()
//   const [svgName] = fileName.split('.')
//   return svgName
// })

// 引入的时候注意加上?worker后缀，相当于告诉 Vite 这是一个 Web Worker 脚本文件
import Worker from './worker.js?worker'
import SvgIcon from '../SvgIcon'
// 1. 初始化 Worker 实例
const worker = new Worker()
// 2. 主线程监听 worker 的信息
worker.addEventListener('message', (message) => {
  console.log(message)
})

export function Header() {
  useEffect(() => {
    const img = document.getElementById('logo') as HTMLImageElement
    img.src = logoSrc
  }, [])
  return (
    <div className={styles.header}>
      <img src={logoSrc} alt="" />
      <img id="logo" alt="" />
      <ReactLogo />
      <img
        src={
          new URL(
            './2022/12/16/ULgAaJXepI.jpg',
            import.meta.env.VITE_IMG_BASE_URL
          ).href
        }
      />
      {['1', '2', '3', '4', '5'].map((item) => (
        <SvgIcon name={`logo-${item}`} key={item} width="50" height="50" />
      ))}
    </div>
  )
}
