<script setup lang="ts">
import { sidebarState } from '@/composables/sidebar'
import Caret from '@/components/icon/Caret.vue'

/*
 * 侧栏：配置展平后的单个 v-for 渲染，不递归
 * 折叠状态、可见项、缩进、滚动定位全在 composables，此处只取接口
 */
const { flatNodes, visible, isCollapsed, toggle, indent, treeRef } = sidebarState()
</script>

<template>
  <div class="sidebar-inner">
    <template v-if="flatNodes.length">
      <div class="sb-head">文档</div>
      <ul ref="treeRef" class="sb-tree">
        <li v-for="node in visible" :key="node.key" class="sb-row">
          <!--
            分组：整行都是折叠热区（点箭头、点空白、点无链接的标题都能折叠），
            命中区域远大于 18px 的图标本身。
            标题配了 link（索引页入口）时 .stop 拦下冒泡 —— 点标题是导航，不是折叠。
            箭头保留 button：键盘 Tab 可达，Enter 触发的 click 同样冒泡到本行
          -->
          <div
            v-if="node.isFolder"
            class="sb-folder-head"
            :class="{ open: !isCollapsed(node.key) }"
            :style="{ paddingLeft: indent(node.depth) }"
            @click="toggle(node.key)"
          >
            <router-link
              v-if="node.link"
              class="sb-text"
              :to="node.link"
              @click.stop
            >{{ node.text }}</router-link>
            <span v-else class="sb-text">{{ node.text }}</span>
            <button
              class="sb-caret"
              type="button"
              :aria-expanded="!isCollapsed(node.key)"
              :aria-label="`${isCollapsed(node.key) ? '展开' : '折叠'} ${node.text}`"
            >
              <Caret />
            </button>
          </div>

          <!-- 叶子：普通文档链接 -->
          <router-link
            v-else
            class="sb-link"
            :style="{ paddingLeft: indent(node.depth) }"
            :to="node.link ?? '/'"
            active-class="on"
          >
            <span class="sb-text">{{ node.text }}</span>
          </router-link>
        </li>
      </ul>
    </template>
    <p v-else class="sb-empty">暂无文档</p>
  </div>
</template>

<style scoped>
.sidebar-inner {
  padding: var(--space-lg) 0;
}

/* ---- 标题：与右侧 PostToc 的 .toc-head 同一套视觉语言 ---- */
.sb-head {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 var(--space-sm) var(--space-sm);
  font-size: 13px;
  font-weight: 600;
  color: var(--g-text);
}

.sb-tree {
  margin: 0;
  padding: 0;
  list-style: none;
}

.sb-tree li {
  list-style: none;
}

.sb-row {
  margin: 0;
}

/* 文字：分组与叶子共用，超长省略 */
.sb-text {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ====================<分组行>==================== */

/* 左内边距由 depth 行内给出，此处不再声明 padding-left */
.sb-folder-head {
  display: flex;
  align-items: center;
  gap: 4px;
  margin: 0 var(--space-xs) 0 0;
  padding: 6px var(--space-xs) 6px 0;
  border-radius: var(--radius-sm);
  color: var(--g-text);
  cursor: pointer; /* 整行都是折叠热区，光标需提示可点 */
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.sb-folder-head:hover {
  color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 8%, transparent);
}

.sb-folder-head .sb-text {
  color: inherit;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
}

/* 折叠箭头：展开时右转 90° */
.sb-caret {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  padding: 0;
  border: none;
  border-radius: var(--radius-sm);
  background: none;
  color: color-mix(in srgb, var(--g-text) 45%, transparent);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.15s ease;
}

.sb-caret:hover {
  color: var(--g-color);
}

.sb-folder-head.open > .sb-caret {
  transform: rotate(90deg);
}

/* ====================<叶子行>==================== */

.sb-link {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0 var(--space-xs) 0 0;
  padding: 5px var(--space-xs) 5px 0;
  border-radius: var(--radius-sm);
  color: color-mix(in srgb, var(--g-text) 75%, transparent);
  text-decoration: none;
  font-size: 13px;
  line-height: 1.5;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}

.sb-link:hover {
  color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 8%, transparent);
}

/* 当前文章：朱砂色 + 半字重，与右侧 PostToc 的当前章节高亮同一套语言 */
.sb-link.on {
  color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 10%, transparent);
  font-weight: 600;
}

.sb-dot {
  width: 4px;
  height: 4px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
  background: color-mix(in srgb, var(--g-text) 25%, transparent);
  transition: background 0.15s ease;
}

.sb-link:hover .sb-dot {
  background: var(--g-color);
}

.sb-link.on .sb-dot {
  background: var(--g-color);
}

.sb-empty {
  margin: 0;
  padding: 0 var(--space-sm);
  font-size: 13px;
  color: color-mix(in srgb, var(--g-text) 45%, transparent);
}
</style>
