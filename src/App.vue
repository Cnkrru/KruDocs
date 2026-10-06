<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { initLD, RefLd, setLd } from '@/composables/ld'
import Logo from './components/Logo.vue'
import Nav from './components/Nav.vue'
import Search from './components/Search.vue'
import Copyright from './components/Copyright.vue'
import Sun from './components/icon/Sun.vue'
import Moon from './components/icon/Moon.vue'
import Github from './components/icon/Github.vue'

// var.css 靠 body 上的 .light/.dark 挂变量，必须客户端挂载后再定class（SSR 阶段无 localStorage）
onMounted(() => {
  initLD()
})

// 亮暗互切
const toggleLd = () => setLd(RefLd.value === 'light' ? 'dark' : 'light')
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
      <button class="el-btn" :title="RefLd === 'light' ? '切换暗色' : '切换亮色'" @click="toggleLd">
        <Sun class="icon" v-if="RefLd === 'light'" />
        <Moon class="icon" v-else />
      </button>
    </div>
  </aside>
  <main class="main"><RouterView /></main>
  <footer class="footer"><Copyright /></footer>
</template>

<style>
/* ---- 基础重置与全局外观（对应 cvdocs base.css 的 html/body）---- */
html {
  scroll-behavior: smooth;
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family:
    system-ui,
    -apple-system,
    'PingFang SC',
    'Microsoft YaHei',
    'Noto Sans SC',
    sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--g-text);
  background: var(--g-bg);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition:
    background 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

/* ---- 三区纵向布局：顶栏吸顶 / 内容区吃掉剩余高度 / 页脚自然落底 ---- */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

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

/* ---- 内容区：flex:1 撑开剩余高度，页面短时把页脚压到底部 ---- */
.main {
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ---- 顶栏三段：Logo 左、Search 中、ElList 右 ---- */
/* 横向 flex + space-between 由父级均分剩余空间，Search 自身不再需要 auto 外边距 */
.header > :deep(.search-wrap) {
  flex: 0 1 260px;
}

/* ---- el-list：顶栏右侧的横向元素组（纯布局容器future组件往这里加）---- */
.el-list {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

/* ---- 亮暗切换按钮 ---- */
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

/* ---- 外链按钮（GitHub）：与 .el-btn 同视觉 ---- */
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

/* ---- 页脚：只做语义分区，视觉样式全在Copyright.vue ---- */
.footer {
  flex-shrink: 0;
}

/* ---- 窄屏：顶栏脱离固定高度允许换行，搜索独占一行 ---- */
@media (max-width: 768px) {
  .header {
    height: auto;
    min-height: 56px;
    flex-wrap: wrap;
    padding-top: 8px;
    padding-bottom: 8px;
  }

  /* 换行后搜索独占一行铺满 */
  .header > :deep(.search-wrap) {
    order: -1;
    flex: 1 1 100%;
  }

  .el-list {
    gap: 12px;
  }

  .main {
    padding: 0 12px;
  }
}
</style>
