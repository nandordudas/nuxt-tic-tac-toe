<script setup lang="ts">
import { z } from 'zod'

import type { UserWithPassword } from '~/types'

import type { FormSubmitEvent } from '#ui/types'

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
})

type Schema = z.output<typeof schema>

const state = shallowReactive<UserWithPassword>({
  email: null,
  name: null,
  password: null,
})

const { login } = useLobbyStore()

function mockLogin(_event: FormSubmitEvent<Schema>): void {
  login(state)

  navigateTo('/lobby')
}
</script>

<template>
  <UCard class="w-96">
    <UForm class="space-y-4" :state :schema @submit="mockLogin">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" type="email" autocomplete="username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Password" autocomplete="current-password" />
      </UFormGroup>

      <UButton label="Login" color="gray" block type="submit" />

      <UDivider label="OR" />

      <UButton color="black" label="Login with GitHub" icon="i-simple-icons-github" block />
      <UButton color="black" label="Login with Google" icon="i-simple-icons-google" block />
    </UForm>
  </UCard>
</template>
