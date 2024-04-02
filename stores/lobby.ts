import type { Payload } from '~/types'

export const useLobbyStore = defineStore('lobby', () => {
  const state = reactive<{ messages: Payload[] }>({
    messages: [],
  })

  return {
    ...toRefs(state),
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLobbyStore, import.meta.hot))
