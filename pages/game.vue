<script setup lang="ts">
definePageMeta({
  middleware: ['01-auth'],
})

useHead({
  title: 'Game',
})
</script>

<template>
  <div class="grid place-items-center  h-[calc(100vh-49px-16px)]">
    <GameBoard />
  </div>
</template>
