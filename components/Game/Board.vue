<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const gameStore = useGameStore()
</script>

<template>
  <UCard>
    <div v-if="gameStore.items.length === 0" class="flex items-center space-x-4">
      <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />

      <div class="space-y-2">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[200px]" />
      </div>
    </div>

    <div v-else class="grid grid-cols-3 gap-4 w-56 aspect-square place-items-center">
      <GameField v-for="(item, i) in gameStore.items" :key="i" :item :loading="gameStore.isLoading" @select="gameStore.selectItem" />
    </div>

    <!-- TODO: remove, just for testing -->
    <UProgress indicator :value="gameStore.moves" :max="9" class="mt-4" />
  </UCard>
</template>
