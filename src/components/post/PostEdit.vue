<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { repoEditUrl } from '@/composables/repo'
import Edit from '@/components/icon/Edit.vue'

const route = useRoute()
const postKey = computed(() => {
  const value = route.params.pathMatch
  return Array.isArray(value) ? value.join('/') : String(value ?? '')
})
// 未配置仓库时为空串，此时不渲染入口，避免死链
const href = computed(() => repoEditUrl(postKey.value))
</script>

<template>
  <a v-if="href" class="edit" :href="href" target="_blank" rel="noopener noreferrer">
    <Edit class="icon" />
    <span class="text">在 GitHub 上编辑此页</span>
  </a>
</template>

<style scoped>
.edit {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);

  font-size: 13px;
  font-weight: 500;
  color: color-mix(in srgb, var(--g-text) 55%, transparent);
  text-decoration: none;

  transition: color 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.edit:hover {
  color: var(--g-color);
}

.icon {
  flex-shrink: 0;
  opacity: 0.85;
}

.edit:hover .icon {
  opacity: 1;
}

@media (max-width: 768px) {
  .text {
    display: none;
  }
}
</style>
