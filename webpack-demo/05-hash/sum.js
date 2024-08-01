// 无以下两行代码为第一次打包，添加以下两行代码为第二次打包
import _ from 'lodash'
console.log(_.get)

const sum = (...args) => args.reduce((x, y) => x + y)

export default sum
