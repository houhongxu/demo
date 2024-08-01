const express = require('express')
const path = require('path')
const fs = require('fs')

const server = express()

server.use(express.static('dist')) // 开启静态资源服务

// / 替换为 * 来避免前端路由如/me匹配失效
server.get('*', async (req, res) => {
  const template = `
  <html>
    <head>
      <title>SSR</title>
    </head>
    <body>
      <div id="root"><!--app-html--></div>
      <script src="./client.js"></script>
    </body>
  </html>
`

  const render = require(path.resolve('./dist/server.js')).render

  const rendered = await render(req)

  const html = template.replace('<!--app-html-->', rendered.html)

  res.send(html)
})

server.listen(3007, () => {
  console.log('http://localhost:3007')
})
