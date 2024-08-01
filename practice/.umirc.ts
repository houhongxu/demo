import { defineConfig } from 'umi'

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { exact: true, path: '/', component: '@/pages/index.tsx' },
    { exact: true, path: '/todo-list', component: '@/pages/todo-list/index.tsx' },
    { exact: true, path: '/practice-one', component: '@/pages/practice-one/index.tsx' },
    { exact: true, path: '/practice-two', component: '@/pages/practice-two/index.tsx' },
    { exact: true, path: '/practice-three', component: '@/pages/practice-three/index.tsx' },
    { exact: true, path: '/practice-four', component: '@/pages/practice-four/index.tsx' },
    { exact: true, path: '/antd', component: '@/pages/antd/index.tsx' },
    { exact: true, path: '/cloud-base', component: '@/pages/cloud-base/index.tsx' },
  ],
  fastRefresh: {},
})
