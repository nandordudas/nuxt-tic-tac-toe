<script setup lang="ts">
import type { z } from 'zod'

import type { FormSubmitEvent } from '#ui/types'

const { register } = useAuthStore()
const [isPasswordVisible, togglePasswordVisibility] = useToggle()

type Schema = z.output<typeof registerFormSchema>

const state = shallowReactive<Schema>({
  confirmPassword: '',
  email: '',
  password: '',
})

function onSubmit({ data }: FormSubmitEvent<Schema>): void {
  register({ email: data.email, password: data.password })
}

const confirmPasswordFieldAttributes = computed(() => ({
  icon: isPasswordVisible.value ? 'i-heroicons-eye' : 'i-heroicons-eye-slash',
  type: isPasswordVisible.value ? 'text' : 'password',
} as const))
</script>

<template>
  <UCard class="w-96">
    <UForm class="space-y-4" :state :schema="registerFormSchema" @submit="onSubmit">
      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" placeholder="Email" type="email" autocomplete="username" />
      </UFormGroup>

      <UFormGroup label="Password" name="password">
        <UInput v-model="state.password" type="password" placeholder="Password" autocomplete="new-password" />
      </UFormGroup>

      <UFormGroup label="Confirm password" name="confirmPassword">
        <UInput
          v-model="state.confirmPassword"
          :ui="{ icon: { trailing: { pointer: '' } } }"
          :type="confirmPasswordFieldAttributes.type"
          placeholder="Confirm Password"
          spellcheck="false"
        >
          <template #trailing>
            <span class="text-gray-500 dark:text-gray-400 text-xs" @click="togglePasswordVisibility()">
              <UButton :icon="confirmPasswordFieldAttributes.icon" :padded="false" variant="link" />
            </span>
          </template>
        </UInput>
      </UFormGroup>

      <UButton label="Register" color="gray" block type="submit" />
    </UForm>
  </UCard>
</template>
