import type { Coordinate } from '~/types'

export const useGameStore = defineStore('game', () => {
  const state = reactive ({
    isLoading: true,
    // INFO: mocked fields
    items: Array.from({ length: 9 }, (_, i) => ({ value: '', x: i % 3, y: Math.floor(i / 3) })),
  })

  const moves = computed(() => state.items.filter(({ value }) => value).length ?? 0)

  onMounted(async () => {
    state.isLoading = true

    const { data } = await $fetch('/api/get-fields')

    state.items = data.fields
    state.isLoading = false
  })

  async function selectItem(coordinate: Coordinate): Promise<void> {
    state.isLoading = true

    const { data } = await $fetch('/api/select-field', {
      body: coordinate,
      method: 'post',
    })

    if (!data.success)
      return

    state.items = data.fields
    state.isLoading = false

    const toast = useToast()

    toast.add({ title: 'Field selected, waiting for other player' })
  }

  return {
    ...toRefs(state),
    moves,
    selectItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot))
