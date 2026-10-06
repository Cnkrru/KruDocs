<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

type PostMeta = { title: string; date: string; updated: string }

// 读编译期产物 .cache/post.json（parseArticle.ts 的同步副本），与侧栏同一套做法。
// 不用运行时 axios：SSG 预渲染阶段不执行 onMounted，那条路只能出静态 HTML 里的空日期。
// 用 glob 而非静态 import —— 首次构建该文件可能尚未生成，glob 返回空对象而非编译报错
const metaMap = import.meta.glob<PostMeta>('/.cache/post.json', { eager: true, import: 'default' })
const postMeta = computed(() => metaMap['/.cache/post.json'] as Record<string, PostMeta> | undefined)

const route = useRoute()
// pathMatch 是可重复参数，嵌套文章的 id 含斜杠，需拼回完整 id
const postKey = computed(() => {
  const value = route.params.pathMatch
  return Array.isArray(value) ? value.join('/') : String(value ?? '')
})

const meta = computed(() => postMeta.value?.[postKey.value])

// updated 缺省时 parseArticle 会用源文件 mtime 兜底，故正常都有值；仍兜一层空态
const text = computed(() => (meta.value?.updated ? `最后编辑于 ${meta.value.updated}` : ''))
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
  font-weight: 600;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  color: var(--g-color); /* 日期数值改主色，对齐 status 统计数值配色 */
  line-height: 1;
}
</style>
