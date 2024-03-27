<script setup lang="ts">
definePageMeta({
  middleware: ['01-authenticated'],
})

const user = useUser()

function mockLogout(): void {
  user.value.email = null
  user.value.name = null

  navigateTo('/')
}
</script>

<template>
  <div>
    🚧 in progress

    TODO: or maybe profile?

    <UButton label="Logout" color="gray" block @click="mockLogout" />
  </div>
</template>
