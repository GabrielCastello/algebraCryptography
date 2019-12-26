// const myPages = [
//   { url: 'encrypt', file: 'Encrypt', title: 'Criptografar' },
//   { url: 'decrypt', file: 'Decrypt', title: 'Descriptografar' }
// ]

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Encrypt.vue') }
      // { path: '/Encrypt', component: () => import('pages/Encrypt.vue') },
      // ...myPages.map(page => {
      //   return {
      //     path: `/${page.url}`,
      //     component: () => import('pages/' + page.file + '.vue')
      //   }
      // })
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
