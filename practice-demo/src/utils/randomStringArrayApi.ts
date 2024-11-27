import { constConfig } from '@/configs/constant'

//随机字符
const randomString = (length = 32) => {
  const seed = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  const seedLength = seed.length
  let str = ''

  while (length-- > 0) {
    str += seed.charAt(Math.floor(Math.random() * seedLength))
  }

  return str
}

//模拟延迟api
const timeout = (ms: number) =>
  new Promise<string>((resolve) => {
    setTimeout(resolve, ms, 'load done')
  })

export const randomStringArrayApi = async (currentPage = 1, pageSize = 10) => {
  let arr = Array.from({ length: constConfig.page.LIST_COUNT }, () => randomString(50))

  await timeout(1000)

  let pageArr = arr.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return { list: pageArr, total: constConfig.page.LIST_COUNT }
}
