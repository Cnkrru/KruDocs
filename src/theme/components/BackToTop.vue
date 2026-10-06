<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { backToTop, scrollProgress } from '@/composables/post'

// 滚动进度环：监听滚动更新 --progress 变量，卸载时解绑监听
let cleanup: (() => void) | null = null
onMounted(() => {
  cleanup = scrollProgress()
})
onUnmounted(() => {
  cleanup?.()
})
</script>

<template>
  <button class="back-top-btn" @click="backToTop()" aria-label="返回顶部">
    <span class="progress"></span>
    <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
  </button>
</template>

<style scoped>
.back-top-btn {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 999;

  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 50%;
  background-color: var(--g-color);
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease;
}

.back-top-btn:hover {
  transform: translateY(-3px);
}

.back-icon {
  width: 16px;
  height: 16px;
  color: #fff;
}

/* 进度环：conic-gradient 按 --progress 画已读比例，套在按钮外圈 */
.progress {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  z-index: -1;
  background: conic-gradient(var(--g-color) var(--progress), transparent 0);
}

/* ====================<响应式>==================== */
@media (max-width: 1024px) {
  /* [响应式-md] 平板：位置略收 */
  .back-top-btn {
    right: 24px;
    bottom: 24px;
  }
}

@media (max-width: 768px) {
  /* [响应式-sm] 手机：缩小按钮，避开移动端底部操作区 */
  .back-top-btn {
    right: 16px;
    bottom: 16px;
    width: 36px;
    height: 36px;
  }
  .back-icon {
    width: 14px;
    height: 14px;
  }
}

@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：进一步缩小 */
  .back-top-btn {
    width: 32px;
    height: 32px;
  }
}
</style>
