import type { UserWithPassword } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const { finish, start } = useLoadingIndicator()

  const state = reactive({
    isAuthenticated: false,
  })

  async function navigateToDashboard(): Promise<ReturnType<typeof navigateTo>> {
    state.isAuthenticated = true

    return navigateTo('/dashboard', { replace: true })
  }

  async function logout(): Promise<void> {
    start()

    await $fetch('/api/logout')
    await navigateTo('/', { replace: true })

    finish()

    state.isAuthenticated = false
  }

  async function login(user: Omit<UserWithPassword, 'id'>): Promise<void> {
    await $fetch('/api/login', { body: user, method: 'post' })
    await navigateToDashboard()
  }

  async function register(user: Omit<UserWithPassword, 'id'>): Promise<void> {
    await $fetch('/api/register', { body: user, method: 'post' })
    await navigateToDashboard()
  }

  return {
    ...toRefs(state),
    login,
    logout,
    register,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
