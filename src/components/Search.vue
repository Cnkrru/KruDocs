<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import {
  RefKeyword,
  RefSearchRes,
  searchOpen,
  buildIndex,
  go,
  resetSearch,
  searchHl,
  onEnter,
  onFocus,
  mountSearch,
  unmountSearch,
} from '@/composables/search'

onMounted(() => {
  buildIndex()
  mountSearch()
})

onUnmounted(() => {
  unmountSearch()
})

// Esc 关闭面板
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') resetSearch()
}
</script>

<template>
  <div class="search-wrap">
    <input
      type="text"
      class="search-input"
      placeholder="搜索文档..."
      v-model="RefKeyword"
      @keydown="onKeydown"
      @keypress.enter="onEnter"
      @focus="onFocus"
      aria-label="搜索文档"
    />
    <button
      class="search-clear"
      :class="{ visible: RefKeyword.length > 0 }"
      @click="resetSearch"
      aria-label="清除搜索"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <div class="search-panel" :class="{ open: searchOpen }">
      <div v-if="RefSearchRes.length === 0" class="search-empty">输入关键词搜索文档</div>
      <ul v-else class="search-results">
        <li v-for="result in RefSearchRes" :key="result.id">
          <a class="search-item" @click.prevent="go(result.id)" href="#">
            <div class="search-item-title" v-html="searchHl(result.title, RefKeyword)"></div>
            <div class="search-item-desc" v-html="searchHl(result.date, RefKeyword)"></div>
          </a>
        </li>
      </ul>
      <div class="search-hint">
        <kbd>Esc</kbd> 关闭
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ---- 搜索 ---- */
.search-wrap {
    position: relative;
    flex: 0 1 260px;
    min-width: 0;
}

.search-input {
    width: 100%;
    height: 34px;
    padding: 0 34px 0 12px;
    border: 1px solid color-mix(in srgb, var(--g-color) 15%, transparent);
    border-radius: 8px;
    background: rgba(var(--glass-r), var(--glass-g), var(--glass-b), 0.6);
    color: var(--g-text);
    font-family: system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif;
    font-size: 0.8125rem;
    outline: none;
    transition: border-color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.12s cubic-bezier(0.16, 1, 0.3, 1),
                background 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-input::placeholder {
    color: color-mix(in srgb, var(--g-text) 50%, transparent);
}
.search-input:focus {
    border-color: var(--g-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--g-color) 15%, transparent);
    background: rgba(var(--glass-r), var(--glass-g), var(--glass-b), 0.85);
}

.search-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    pointer-events: none;
    transition: color 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-input:focus ~ .search-icon,
.search-input:not(:placeholder-shown) ~ .search-icon {
    color: var(--g-color);
}

.search-clear {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    display: none;
    align-items: center;
    justify-content: center;
    border: none;
    background: none;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
    transition: color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
                background 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-clear:hover {
    color: var(--g-color);
    background: color-mix(in srgb, var(--g-color) 12%, transparent);
}
.search-clear.visible { display: flex; }

.search-panel {
    position: absolute;
    top: calc(100% + 6px);
    left: 0;
    right: 0;
    max-height: 400px;
    overflow-y: auto;
    box-sizing: border-box; /* 无全局 border-box 重置，须显式声明，否则 padding 会把面板撑破 max-height */
    /* 上下留白：滚动条不贴面板顶/底边 */
    padding: var(--space-xs) 0;
    background: rgba(var(--glass-r), var(--glass-g), var(--glass-b), 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid color-mix(in srgb, var(--g-color) 15%, transparent);
    border-radius: 8px;
    box-shadow: 0 8px 24px var(--g-shadow);
    z-index: 200;
    display: none;
    animation: panelIn 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-panel.open { display: block; }

@keyframes panelIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
}

.search-empty {
    padding: 24px 16px;
    text-align: center;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    font-size: 0.8125rem;
}

.search-results {
    margin: 0;
    padding: 4px;
    list-style: none;
}

.search-item {
    display: block;
    padding: 8px 12px;
    border-radius: 5px;
    text-decoration: none;
    color: var(--g-text);
    cursor: pointer;
    transition: background 0.12s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.search-item:hover {
    background: color-mix(in srgb, var(--g-color) 12%, transparent);
    transform: translateX(2px);
}
.search-item:active {
    transform: scale(0.99);
}

.search-item-title {
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 2px;
    line-height: 1.4;
}
.search-item-title mark {
    background: none;
    color: var(--g-color);
    font-weight: 700;
}

.search-item-desc {
    font-size: 0.75rem;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 2px;
}
.search-item-desc mark {
    background: none;
    color: var(--g-color);
}

.search-hint {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 8px 12px;
    border-top: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
    font-size: 0.6875rem;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    opacity: 0.65;
}
</style>
