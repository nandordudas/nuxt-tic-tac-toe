<script setup lang="ts">
const authStore = useAuthStore()

// eslint-disable-next-line complexity
const links = computed(() => {
  const leftSideLinks = [
    { label: 'Home', to: '/' },
    authStore.isAuthenticated ? { label: 'Dashboard', to: '/dashboard' } : undefined,
    authStore.isAuthenticated ? { label: 'Lobby', to: '/lobby' } : undefined,
    authStore.isAuthenticated ? { label: 'Game', to: '/game' } : undefined,
  ].filter(Boolean)

  const rightSideLinks = [
    authStore.isAuthenticated ? undefined : { label: 'Login', to: '/login' },
    authStore.isAuthenticated ? undefined : { label: 'Register', to: '/register' },
    authStore.isAuthenticated ? { click: authStore.logout, label: 'Logout' } : undefined,
  ].filter(Boolean)

  return [leftSideLinks, rightSideLinks]
})
</script>

<template>
  <UHorizontalNavigation :links class="border-b border-gray-200 dark:border-gray-800 mb-4" />
</template>
