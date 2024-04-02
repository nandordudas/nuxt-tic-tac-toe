<script setup lang="ts">
definePageMeta({
  middleware: ['02-authenticated'],
})

useHead({
  title: 'Login',
})
</script>

<template>
  <div class="grid place-items-center h-[calc(100vh-49px-16px)]">
    <LoginForm />
  </div>
</template>
