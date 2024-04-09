import type { Nullable, User, UserWithPassword } from '~/types'

import type { FormSubmitEvent } from '#ui/types'

interface State {
  isAuthenticated: boolean
  user: Nullable<User>
}

type UserAuthenticationEvent = FormSubmitEvent<Omit<UserWithPassword, 'id'>>

export const useAuthStore = defineStore('auth', () => {
  const { finish, start } = useLoadingIndicator()

  const state = reactive<State>({
    isAuthenticated: false,
    user: null,
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

  async function login(event: UserAuthenticationEvent): Promise<void> {
    await $fetch('/api/login', { body: event.data, method: 'post' })
    await navigateToDashboard()
  }

  async function register(event: UserAuthenticationEvent): Promise<void> {
    await $fetch('/api/register', { body: event.data, method: 'post' })
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
