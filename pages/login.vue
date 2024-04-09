<script setup lang="ts">
const { login } = useAuthStore()

definePageMeta({
  middleware: ['02-authenticated'],
})

useHead({
  title: 'Login',
})
</script>

<template>
  <div class="grid place-items-center h-[calc(100vh-49px-16px)]">
    <LoginForm @submit="({ data }) => { login(data) }" />
  </div>
</template>
