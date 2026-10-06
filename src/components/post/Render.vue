<script setup lang="ts">
import { onMounted } from 'vue'
import { root, codeCopy, imgBox, mermaid } from '../../composables/post.ts'
import { highlight } from '../../composables/highlight.ts'

onMounted(() => {
  highlight() // 先高亮：mermaid 要接管的是 pre[data-lang=mermaid]，两者不冲突但顺序求稳
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
