<script setup lang="ts">
import { postUpdated } from '@/composables/post'

const text = postUpdated()
</script>

<template>
  <div class="meta">
    <p v-if="text" class="update">{{ text }}</p>
  </div>
</template>

<style scoped>
/* 元信息组：更新时间，与右侧 .links 同一基线对齐 */
.meta {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.update {
  font-size: 13px;
  font-weight: 500;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  color: color-mix(in srgb, var(--g-text) 55%, transparent);
  line-height: 1;
  transition: color 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.update:hover {
  color: var(--g-color);
}
</style>
