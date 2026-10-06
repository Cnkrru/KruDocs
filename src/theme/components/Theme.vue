<script setup lang="ts">
import { RefLd, setLd } from '@/composables/ld'
import Sun from './icon/Sun.vue'
import Moon from './icon/Moon.vue'

// 亮暗互切
const toggleLd = () => setLd(RefLd.value === 'light' ? 'dark' : 'light')
</script>

<template>
  <button class="el-btn" :title="RefLd === 'light' ? '切换暗色' : '切换亮色'" @click="toggleLd">
    <Sun class="icon" v-if="RefLd === 'light'" />
    <Moon class="icon" v-else />
  </button>
</template>

<style scoped>
.el-btn {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--g-color) 15%, transparent);
  border-radius: 5px;
  background: none;
  color: color-mix(in srgb, var(--g-text) 55%, transparent);
  cursor: pointer;
  padding: 0;
  transition:
    color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.el-btn:hover {
  color: var(--g-color);
  border-color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 8%, transparent);
}

.icon {
  display: block;
  width: 16px;
  height: 16px;
}
</style>