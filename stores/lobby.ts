import type { User } from '~/types'

export const useLobbyStore = defineStore('lobby', () => {
  // state
  const state = shallowReactive<User>({
    email: null,
    name: null,
  })

  // getters

  // actions
  function login(user: User): void {
    state.email = user.email
    state.name = user.name
  }

  return {
    login,
    state,
  }
})
