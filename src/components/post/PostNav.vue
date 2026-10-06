<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { neighborOf } from '@/composables/sidebar'

const route = useRoute()
const { pre, next } = computed(() => neighborOf(route.path)).value
</script>

<template>
  <div class="postnav-area">
    <!-- 上一篇的按钮 -->
    <router-link v-if="pre" :to="pre.link" class="post-btn pre-post">
      <div class="post-label">上一篇</div>
      <div class="post-title">{{ pre.title }}</div>
    </router-link>
    <a v-else class="post-btn pre-post">
      <div class="post-label">上一篇</div>
      <div class="post-title">已是第一篇</div>
    </a>

    <!-- 下一篇的按钮 -->
    <router-link v-if="next" :to="next.link" class="post-btn next-post">
      <div class="post-label">下一篇</div>
      <div class="post-title">{{ next.title }}</div>
    </router-link>
    <a v-else class="post-btn next-post">
      <div class="post-label">下一篇</div>
      <div class="post-title">已是最后一篇</div>
    </a>
  </div>
</template>

<style scoped>
.postnav-area {
  width: 100%;
  height: fit-content;
  min-height: 100px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: var(--space-md);
}

.post-btn {
  width: 50%;
  height: fit-content;

  padding: var(--space-md) var(--space-lg);
  /* 边框 12% → 25%，提升可见度（12% 太浅不明显） */
  border: var(--border-width) solid color-mix(in srgb, var(--g-color) 25%, transparent);
  border-radius: var(--radius-lg);

  background: rgba(var(--glass-r), var(--glass-g), var(--glass-b), 0.5);

  transition:
    background 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  text-decoration: none;
}

.post-btn:hover {
  background: rgba(var(--glass-r), var(--glass-g), var(--glass-b), 0.8);
  border-color: var(--g-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

.pre-post {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: var(--space-xs);
}

.next-post {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  gap: var(--space-xs);
}

.post-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: color-mix(in srgb, var(--g-text) 45%, transparent);
}

.post-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--g-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}

/* ====================<响应式>==================== */
@media (max-width: 1280px) {
  /* [响应式-lg] 大屏 */
}

@media (max-width: 1024px) {
  /* [响应式-md] 平板 */
}

@media (max-width: 768px) {
  /* [响应式-sm] 手机：两按钮保持并排，收紧边距与内边距 */
  .postnav-area {
    gap: var(--space-sm);
  }
  .post-btn {
    padding: var(--space-sm) var(--space-md);
  }
}

@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：并排太挤，改纵向堆叠为全宽按钮 */
  .postnav-area {
    flex-direction: column;
    gap: var(--space-xs);
  }
  .post-btn {
    width: 100%;
  }
}
</style>
