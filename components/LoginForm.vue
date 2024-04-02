<script setup lang="ts">
import type { z } from 'zod'

import type { FormSubmitEvent } from '#ui/types'

const authStore = useAuthStore()

type Schema = z.output<typeof loginFormSchema>

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
