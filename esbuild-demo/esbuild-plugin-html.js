// TODO onEnd拿不到结果

const fs = require('fs/promises')
const path = require('path')
const httpImportPlugin = require('./esbuild-plugin-http-import')

const createScript = (src) => `<script type="module" src="${src}"></script>`
const createLink = (src) => `<link rel="stylesheet" href="${src}"></link>`
const generateHTML = (scripts, links) => `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join('\n')}
</head>

<body>
  <div id="root"></div>
  ${scripts.join('\n')}
</body>

</html>
`

const htmlPlugin = () => {
  return {
    name: 'esbuild:html',
    setup(build) {
      build.onEnd(async (buildResult) => {
        if (buildResult.errors.length) {
          return
        }
        const { metafile } = buildResult
        // 1. 拿到 metafile 后获取所有的 js 和 css 产物路径
        const scripts = []
        const links = []
        if (metafile) {
          const { outputs } = metafile
          const assets = Object.keys(outputs)

          assets.forEach((asset) => {
            if (asset.endsWith('.js')) {
              scripts.push(createScript(asset))
            } else if (asset.endsWith('.css')) {
              links.push(createLink(asset))
            }
          })
        }
        // 2. 拼接 HTML 内容
        const templateContent = generateHTML(scripts, links)
        // 3. HTML 写入磁盘
        const templatePath = path.join(process.cwd(), 'index.html')
        await fs.writeFile(templatePath, templateContent)
      })
    },
  }
}

const { build } = require('esbuild')

async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ['./src/html.jsx'],
    outfile: 'dist/html.js',
    bundle: true,
    format: 'esm',
    plugins: [httpImportPlugin(), htmlPlugin()],
  }).then(() => {
    console.log('🚀 Html Build Finished!')
  })
}

runBuild()
