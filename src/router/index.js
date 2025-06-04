// router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Layouts
const MainLayout = () => import('@/layouts/MainLayout.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')

// Views - Autenticação
const Login = () => import('@/views/Auth/Login.vue')
const Forgot = () => import('@/views/Auth/Forgot.vue')

// Views - Aplicação
const Profile = () => import('@/views/App/Profile/ProfilePage.vue')
const Dashboard = () => import('@/views/App/Dashboard.vue')
const Usuarios = () => import('@/views/App/Users/Users.vue')
const Settings = () => import('@/views/App/Settings/Settings.vue')

// Definição das rotas
const routes = [
  // Redireciona raiz para dashboard (pode mudar conforme sua necessidade)
  {
    path: '/',
    redirect: { name: 'dashboard' }
  },

  // Autenticação
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

  // Aplicação
  {
    path: '/app',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard' } // Removido public: true (será rota privada)
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: { title: 'Meu Perfil' } // Removido public: true
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: { title: 'Gestão de Usuários' } // Removido public: true
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings,
        meta: { title: 'Settings' } // Removido public: true
      }
    ]
  },

  // Fallback para rotas inválidas - redireciona para dashboard em vez de login
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'dashboard' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

// Atualiza título da página
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Sistema` : 'Sistema'
  next()
})

export default router