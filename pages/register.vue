<script setup lang="ts">
definePageMeta({
  middleware: ['02-authenticated'],
})

useHead({
  title: 'Register',
})
</script>

<template>
  <div class="grid place-items-center h-[calc(100vh-49px-16px)]">
    <RegisterForm />
  </div>
</template>
