// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth.store.js'
import { useToast } from 'vue-toastification'

// Layouts
const MainLayout = () => import('@/layouts/MainLayout.vue')
const AuthLayout = () => import('@/layouts/AuthLayout.vue')

// Views - Autenticação
const Login = () => import('@/views/Auth/Login.vue')
const Register = () => import('@/views/Auth/Register.vue')
const Forgot = () => import('@/views/Auth/Forgot.vue')

// Views - Aplicação
const Profile = () => import('@/views/App/Profile/ProfilePage.vue')
const ProfileComplete = () => import('@/views/App/Profile/ProfileCompletePage.vue')
const Dashboard = () => import('@/views/App/Dashboard.vue')
const Usuarios = () => import('@/views/App/Users/Users.vue')
const Settings = () => import('@/views/App/Settings/Settings.vue')

// Definição das rotas
const routes = [
  // Redireciona raiz para dashboard (pode mudar conforme sua necessidade)
  {
    path: '/',
    redirect: { name: 'login' }
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
        path: 'register',
        name: 'register',
        component: Register,
        meta: { title: 'Registro', public: true }
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
        meta: { requiresAuth: true, title: 'Dashboard' } // Removido public: true (será rota privada)
      },
      {
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true, title: 'Meu Perfil' } // Removido public: true
      },
      {
        path: 'profile/completar',
        name: 'completar',
        component: ProfileComplete,
        meta: { requiresAuth: true, title: 'Meu Perfil' } // Removido public: true
      },
      {
        path: 'usuarios',
        name: 'usuarios',
        component: Usuarios,
        meta: { requiresAuth: true, title: 'Gestão de Usuários' } // Removido public: true
      },
      {
        path: 'settings',
        name: 'settings',
        component: Settings,
        meta: { requiresAuth: true, title: 'Settings' } // Removido public: true
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

/// guardião das rotas
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  document.title = to.meta.title ? `${to.meta.title} | Sistema` : 'Sistema'
  const toast = useToast()

  // Verifica se a rota requer autenticação
  if (to.meta.requiresAuth) {
    // 1. Verifica se tem token no localStorage
    const token = localStorage.getItem('auth_token')

    if (!token) {
      toast.error('Você não tem permissão ou suas credências expiraram, tente realizar o login novamente.', {
        position: "bottom-right",
        timeout: 3000
      })

      return next({ name: 'login' }) // Redireciona para login
    }

    // 2. Verifica se o token está definido no store (Pinia)
    if (!authStore.token) {
      authStore.setToken(token) // Sincroniza o store
    }

    // 3. Opcional: Valida o token com o backend
    if(authStore.isAuthenticated) {

      next() // Permite acesso
    } else{
      toast.error('Você não tem permissão ou suas credências expiraram, tente realizar o login novamente.', {
        position: "bottom-right",
        timeout: 3000
      })

      authStore.logout()
      next({ name: 'login' }) // Token inválido
    }
  } else {
    next() // Rota pública
  }
})

export default router