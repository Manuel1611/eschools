
const routes = [
  {
    path: '/postauth',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/SplashLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SpashScreen.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AdminPage.vue') },
      { path: 'users', component: () => import('pages/AdminUsers.vue')},

      { path: 'users/add', component: () => import('pages/AdminAddUser.vue')},



      { path: 'cursos', component: () => import('pages/AdminCurso.vue') },

      { path: 'cursos/add', component: () => import('pages/AdminAddCurso.vue') },
      { path: 'matricula', component: () => import('pages/AdminUsers.vue') },
      { path: 'profesor', component: () => import('pages/AdminUsers.vue') },


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
