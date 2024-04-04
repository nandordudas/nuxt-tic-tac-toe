<script setup lang="ts">
import type { z } from 'zod'

const emit = defineEmits(['submit'])

const { login } = useAuthStore()

type Schema = z.output<typeof loginFormSchema>

const state = shallowRef<Schema>({
  email: '',
  password: '',
})

function onSubmit(): void {
  emit('submit', { data: state.value }, login)
}
</script>

<template>
  <UCard class="w-96">
    <UForm class="space-y-4" :state :schema="loginFormSchema" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" type="email" autocomplete="username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Password" autocomplete="current-password" />
      </UFormGroup>

      <UButton label="Login" color="gray" block type="submit" />
    </UForm>
  </UCard>
</template>
