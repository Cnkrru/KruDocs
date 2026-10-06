<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute } from 'vue-router'
import PostToc from '@/components/post/PostToc.vue'
import PostSidebar from '@/components/post/PostSidebar.vue'
import Render from '@/components/post/Render.vue'
import PostNav from '@/components/post/PostNav.vue'
import PostUpdate from '@/components/post/PostUpdate.vue'
import PostEdit from '@/components/post/PostEdit.vue'
const route = useRoute()
// pathMatch 是可重复参数，嵌套文章的 id 含斜杠（如 guide/install），需拼回完整 id
const postKey = computed(() => (route.params.pathMatch as string[]).join('/'))
// id 含子目录 → 产物落 .cache/<子目录>/<id>.vue，glob 必须递归（'**'），单星只匹配一层
const comps = import.meta.glob<{ default: Component }>('/.cache/**/*.vue', { eager: true })
const content = computed(() => comps[`/.cache/${postKey.value}.vue`]?.default ?? null)
</script>

<template>
  <div class="post">
    <aside class="post-sidebar"><PostSidebar /></aside>

    <div class="post-main">
      <Render v-if="content">
        <component :is="content" />
      </Render>

      <div class="mian-footer">
        <div class="el">
          <PostUpdate />
          <div class="links">
            <PostEdit />
          </div>
        </div>
        <PostNav />
      </div>
    </div>

    <PostToc />
  </div>
</template>

<style scoped>
/* ---- 文档页三栏：左侧栏 + 正文 + 右侧目录，横向 flex ---- */
/* align-items: flex-start —— 两个侧栏不被正文高度拉伸，各自 sticky 才能生效 */
.post {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  padding: 24px 0;
}

/* ---- 左侧栏：定宽 + sticky 吸在顶栏下方 ---- */
.post-sidebar {
  flex: 0 0 240px;
  position: sticky;
  top: 56px;
  align-self: flex-start;
  max-height: calc(100vh - 56px - 2 * var(--space-xs));
  overflow-y: auto;
  box-sizing: border-box; /* 无全局 border-box 重置，须显式声明，否则 padding 会把滚动区撑破 max-height */
  /* 上下留白：滚动条不贴容器顶/底边，末项也不被滑块压住 */
  padding: var(--space-xs) 0;
}

/* ---- 正文列：吃掉剩余宽度，min-width: 0 防止长代码块撑破布局 ---- */
.post-main {
  flex: 1 1 auto;
  min-width: 0;
}

/* ---- 正文底部：上一篇/下一篇、更新时间等 ---- */
.mian-footer {
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
}

/* ---- 元信息行：更新时间在左，编辑/历史入口靠右 ---- */
.el {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: var(--space-lg);
}

.links {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

/* ---- 响应式 ---- */
@media (max-width: 1280px) {
  /* [响应式-lg] 大屏：三栏间距略收 */
  .post {
    gap: 24px;
  }
}

@media (max-width: 1024px) {
  /* [响应式-md] 平板：收起左栏给右侧目录让位 */
  .post-sidebar {
    display: none;
  }
}

@media (max-width: 768px) {
  /* [响应式-sm] 手机：目录也收起（PostToc 内部已隐藏） */
  .post {
    gap: 0;
    padding: 16px 0;
  }
}

@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：正文上下间距进一步收紧 */
  .post {
    padding: 8px 0;
  }
  .mian-footer {
    margin-top: 32px;
    padding-top: 16px;
  }
}
</style>
