<script setup lang="ts">
const { register } = useAuthStore()

definePageMeta({
  middleware: ['02-authenticated'],
})

useHead({
  title: 'Register',
})
</script>

<template>
  <div class="grid place-items-center h-[calc(100vh-49px-16px)]">
    <RegisterForm @submit="({ data }) => { register({ email: data.email, password: data.password }) }" />
  </div>
</template>
