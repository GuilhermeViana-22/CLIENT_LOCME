// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
const MainLayout = () => import('@/layouts/MainLayout.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')

// Views - Autenticação
const Login = () => import('@/views/Auth/Login.vue')
const Forgot = () => import('@/views/Auth/Forgot.vue')

// Views - Aplicação
const Perfil = () => import('@/views/App/Profile/ProfilePage.vue')
const Dashboard = () => import('@/views/App/Dashboard.vue')
const Usuarios = () => import('@/views/App/Users/Users.vue')
const Configuracoes = () => import('@/views/App/Settings/Settings.vue')

// Definição das rotas
const routes = [
  {
    path: '/',
    redirect: '/auth/login'
  },

  // Rotas de autenticação (públicas)
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: Login,
        meta: { title: 'Login', public: true }
      },
      {
        path: 'forgot',
        name: 'forgot',
        component: Forgot,
        meta: { title: 'Recuperar Senha', public: true }
      }
    ]
  },

  // Rotas da aplicação (todas públicas temporariamente)
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard', public: true }
      },
      {
        path: 'perfil',
        name: 'perfil',
        component: Perfil,
        meta: { title: 'Meu Perfil', public: true }
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: { title: 'Gestão de Usuários', public: true }
      },
      {
        path: 'configuracoes',
        name: 'configuracoes',
        component: Configuracoes,
        meta: { title: 'Configurações', public: true }
      }
    ]
  },

  // Fallback para rotas desconhecidas
  {
    path: '/:pathMatch(.*)*',
    redirect: '/auth/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Guarda de navegação - todas as rotas são públicas
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Sistema` : 'Sistema'
  next()
})

export default router
