let envPlugin = {
  name: 'env',
  // 路径解析
  setup(build) {
    build.onResolve({ filter: /^env$/ }, (args) => ({
      path: args.path,
      namespace: 'env-ns',
    }))
    // 模块内容加载
    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify({ PATH: 'xxx' }),
      loader: 'json',
    }))
  },
}

require('esbuild')
  .build({
    entryPoints: ['src/env.jsx'],
    bundle: true,
    outfile: 'dist/env.js',
    write: true,
    // 应用插件
    plugins: [envPlugin],
  })
  .catch(() => process.exit(1))
