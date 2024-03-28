<script setup lang="ts">
definePageMeta({
  // middleware: ['01-authenticated'],
})

const lobbyStore = useLobbyStore()
</script>

<template>
  <div>
    <p>lobby</p>

    {{ lobbyStore.state }}
  </div>
</template>
