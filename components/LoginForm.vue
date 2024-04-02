<script setup lang="ts">
import { z } from 'zod'

import type { FormSubmitEvent } from '#ui/types'

const authStore = useAuthStore()

// INFO: same schema in RegisterForm
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = shallowRef<Schema>({
  email: '',
  password: '',
})

function onSubmit(event: FormSubmitEvent<Schema>): void {
  authStore.login(event.data)
}
</script>

<template>
  <UCard class="w-96">
    <UForm class="space-y-4" :state :schema @submit="onSubmit">
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
