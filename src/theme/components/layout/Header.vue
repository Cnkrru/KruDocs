<script setup lang="ts">
import Logo from '../Logo.vue'
import Nav from '../Nav.vue'
import Search from '../Search.vue'
import Theme from '../Theme.vue'
import Github from '../icon/Github.vue'
</script>

<template>
  <aside class="header">
    <Logo />
    <Search />
    <div class="el-list">
      <Nav />
      <!-- TODO 仓库地址待定，先硬编码 GitHub 首页 -->
      <a class="el-link" href="https://github.com/" target="_blank" rel="noopener noreferrer" title="GitHub">
        <Github class="icon" />
      </a>
      <Theme />
    </div>
  </aside>
</template>

<style scoped>
/* ---- 顶栏：sticky 吸顶，毛玻璃 ---- */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 24px;
  background: color-mix(in srgb, var(--g-bg) 85%, transparent);
  -webkit-backdrop-filter: saturate(180%) blur(16px);
  backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
  transition:
    background 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ---- 顶栏三段：Logo 左、Search 中、ElList 右 ---- */
.header :deep(.search-wrap) {
  flex: 0 1 260px;
}

/* ---- el-list：顶栏右侧的横向元素组 ---- */
.el-list {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* ---- 外链按钮（GitHub）：与 ThemeToggle 同视觉 ---- */
.el-link {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid color-mix(in srgb, var(--g-color) 15%, transparent);
  border-radius: 5px;
  color: color-mix(in srgb, var(--g-text) 55%, transparent);
  text-decoration: none;
  transition:
    color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.el-link:hover {
  color: var(--g-color);
  border-color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 8%, transparent);
}

.icon {
  display: block;
  width: 16px;
  height: 16px;
}

/* ---- 响应式 ---- */
@media (max-width: 1024px) {
  /* [响应式-md] 平板：搜索框宽度收窄，顶栏间距略减 */
  .header :deep(.search-wrap) {
    flex: 0 1 200px;
  }
  .header {
    gap: 12px;
    padding: 0 16px;
  }
}

@media (max-width: 768px) {
  /* [响应式-sm] 手机：顶栏脱离固定高度允许换行，搜索独占一行 */
  .header {
    height: auto;
    min-height: 56px;
    flex-wrap: wrap;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .header :deep(.search-wrap) {
    order: -1;
    flex: 1 1 100%;
  }

  .el-list {
    gap: 12px;
  }
}

@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：顶栏内边距进一步收窄，按钮间距收紧 */
  .header {
    padding: 0 8px;
  }
  .el-list {
    gap: 8px;
  }
}
</style>