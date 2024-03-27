<script setup lang="ts">
const form = reactive({
  email: '',
  password: '',
})
</script>

<template>
  <UContainer class="w-180 mx-auto gap-y-4 grid place-items-center h-screen">
    <UCard :ui="{ body: { base: 'grid grid-cols-3' } }">
      <div class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput v-model="form.email" placeholder="Email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="form.password" type="password" placeholder="Password" />
        </UFormGroup>

        <UButton label="Login" color="gray" block />
      </div>

      <UDivider label="OR" orientation="vertical" />

      <div class="space-y-4 flex flex-col justify-center">
        <UButton color="white" label="Login with GitHub" icon="i-simple-icons-github" block />
        <UButton color="white" label="Login with Google" icon="i-simple-icons-google" block />
      </div>
    </UCard>
  </UContainer>
</template>
