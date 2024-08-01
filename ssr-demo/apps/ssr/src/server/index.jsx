import { renderToString } from 'react-dom/server'
import {
  StaticRouterProvider,
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server'
import { routes } from '../shared/routes'

// 目前ssr中只能无data请求的ssr只能使用https://github.com/remix-run/react-router/tree/main/examples/ssr
export async function render(request) {
  const { query, dataRoutes } = createStaticHandler(routes)

  let contextRequest = createFetchRequest(request)

  const context = await query(contextRequest)

  const router = createStaticRouter(dataRoutes, context)

  const html = renderToString(
    <StaticRouterProvider
      router={router}
      context={context}
    ></StaticRouterProvider>,
  )

  return { html }
}

export function createFetchRequest(req) {
  let base = `${req.protocol}://${req.get('host')}`
  let url = new URL(req.originalUrl || req.url, base)

  let init = {
    method: req.method,
    headers: req.headers,
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
