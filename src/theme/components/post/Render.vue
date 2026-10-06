<script setup lang="ts">
import { onMounted } from 'vue'
import { root, codeCopy, imgBox, mermaid } from '../../composables/post.ts'

onMounted(() => {
  // 高亮已在编译期完成（parseArticle.ts 的 shiki），运行时只需图片灯箱和 mermaid
  imgBox()
  mermaid()
})
</script>

<template>
  <div ref="root" class="content" @click="codeCopy">
    <slot />
  </div>
</template>

<style scoped></style>
