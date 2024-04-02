import type { Payload } from '~/types'

export const useLobbyStore = defineStore('lobby', () => {
  const authStore = useAuthStore()

  const state = reactive<{ messages: Payload[] }>({
    messages: [],
  })

  onMounted(() => {
    const { data } = useWebSocket<string>(getWebSocketUrl(authStore.user?.id.toString()))

    watch(data, (value) => {
      if (!value)
        return

      state.messages.push(JSON.parse(value) as Payload)
    })
  })

  return {
    ...toRefs(state),
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useLobbyStore, import.meta.hot))
