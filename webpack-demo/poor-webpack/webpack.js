const fs = require('fs')
const path = require('path')

// code->ast
const { parse } = require('@babel/parser')
// ast->ast
const { default: traverse } = require('@babel/traverse')
// ast->code
const { default: generate } = require('@babel/generator')

let moduleId = 0

// 生成模块树
// {
//   id: 0,
//   filename: A,
//   childs: [
//     { id: 1, filename: B, deps: [] },
//     { id: 2, filename: C, deps: [] },
//   code:'',
//   ]
// }
function buildModule(filename) {
  // 获取绝对路径
  filename = path.resolve(
    __dirname,
    filename.endsWith('.js') ? filename : filename + '.js'
  )
  // 读取入口文件
  const code = fs.readFileSync(filename, 'utf8')

  // 解析为ast
  const ast = parse(code, { sourceType: 'module' })

  const childs = []
  const currentModuleId = moduleId

  // 对ast深度优先遍历，找到所有依赖，并放入模块数组
  traverse(ast, {
    enter({ node }) {
      if (node.type === 'CallExpression' && node.callee.name === 'require') {
        // 是requite函数时
        const argument = node.arguments[0] // require的参数

        if (argument.type === 'StringLiteral') {
          // require的参数是字符串时
          moduleId++

          const nextFilename = path.join(path.dirname(filename), argument.value) // requite的模块路径

          argument.value = moduleId // require的参数值改成moduleId
          node.callee.name = 'webpackRequire' // require的函数改为webpackRequire

          childs.push(buildModule(nextFilename)) // 依赖的模块放入模块数组，并继续读取下一层依赖
        }
      }
    },
  })

  return {
    id: currentModuleId,
    filename,
    childs,
    code: generate(ast).code,
  }
}

//模块由树结构转为数组结构
function moduleTreeToArr(moduleTree) {
  const { childs, ...module } = moduleTree

  const moduleArr = childs.reduce(
    (pre, m) => {
      return pre.concat(moduleTreeToArr(m))
    },
    [module]
  )

  return moduleArr
}

// 创建浏览器端中虚假的 Commonjs Wrapper
// 注入 exports、require、module 等全局变量，注意这里的顺序与 CommonJS 保持一致，但与 webpack 不一致，但影响不大
// 在 webpack 中，这里的 code 需要使用 webpack loader 进行处理
function createModuleWrapper(code) {
  return `
  (function(module,webpackExports,webpackRequire){
    ${code}
  })
  `
}

// 创建打包模板
function createBundleTemplate(entry) {
  const moduleTree = buildModule(entry)
  const modules = moduleTreeToArr(moduleTree)

  const template = `
    const webpackModules=[${modules.map((m) => createModuleWrapper(m.code))}]

    const webpackModuleCache={}

    function webpackRequire(moduleId){
      const cachedModule=webpackModuleCache[moduleId]
      
      if(cachedModule){
        return cachedModule.exports
      }

      const module={exports:{}}
      webpackModuleCache[moduleId]=module

      webpackModules[moduleId](module,module.exports,webpackRequire)

      return module.exports
    }

    webpackRequire(0)
  `

  fs.rmSync(path.resolve(__dirname, './dist/main.js'))
  fs.rmdirSync(path.resolve(__dirname, './dist'))

  fs.mkdirSync(path.resolve(__dirname, './dist'))
  fs.writeFileSync(path.resolve(__dirname, './dist/main.js'), template)
}

module.exports = createBundleTemplate
