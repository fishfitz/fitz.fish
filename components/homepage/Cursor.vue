<template>
  <div
    class="fixed light-cursor p-64 mix-blend-overlay"
    :style="{ left: `${x}px`, top: `${y}px` }"
  />
</template>

<script setup>
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<style lang="scss" scoped>
  .light-cursor {
    opacity: .6;
    background: radial-gradient(#DFD196 0%, transparent 70%);
    transform: translate(-50%, -50%);
  }
</style>
