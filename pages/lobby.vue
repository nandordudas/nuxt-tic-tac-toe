<script setup lang="ts">
definePageMeta({
  middleware: ['01-auth'],
})

useHead({
  title: 'Lobby',
})

const lobbyStore = useLobbyStore()
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
