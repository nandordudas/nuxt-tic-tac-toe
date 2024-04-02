<script setup lang="ts">
import type { Payload } from '~/types'

definePageMeta({
  middleware: ['01-auth'],
})

useHead({
  title: 'Lobby',
})

const authStore = useAuthStore()
const lobbyStore = useLobbyStore()

onMounted(() => {
  const { data } = useWebSocket<string>(getWebSocketUrl())

  watch(data, (value) => {
    if (!value)
      return

    lobbyStore.messages.push(JSON.parse(value) as Payload)
  })
})

function getWebSocketUrl(): string | undefined {
  if (import.meta.server)
    return

  const isSecure = location.protocol === 'https:'
  const url = `${(isSecure ? 'wss://' : 'ws://') + location.host}/api/game-ws?userId=${authStore.user?.id}`

  return url
}
</script>

<template>
  <div>
    <ul v-if="lobbyStore.messages.length">
      <li v-for="{ message } in lobbyStore.messages" :key="message">
        {{ message }}
      </li>
    </ul>

    <div v-else class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </div>
</template>
