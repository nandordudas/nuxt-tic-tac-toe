<script setup lang="ts">
import type { Coordinate, Field } from '~/types'

defineOptions({ inheritAttrs: false })

defineProps<{
  item: Field
  loading?: boolean
}>()

const emit = defineEmits<{
  select: [coordinate: Coordinate]
}>()

const authStore = useAuthStore()
</script>

<template>
  <UButton
    :ui="{ rounded: 'rounded-lg' }"
    class="grid place-items-center h-16 w-16"
    color="gray"
    :disabled="item.value !== ''"
    :loading
    @click="emit('select', { ...item })"
  >
    <UIcon
      v-if="item.value && !loading"
      :name="item.value === authStore.user?.id.toString() ? 'i-simple-icons-conventionalcommits' : 'i-simple-icons-ifixit'"
      :class="item.value === authStore.user?.id.toString() ? 'text-4xl text-red-400' : 'text-4xl text-blue-400'"
    />
  </UButton>
</template>
