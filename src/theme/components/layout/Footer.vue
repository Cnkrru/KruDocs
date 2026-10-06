<script setup lang="ts">
import Copyright from '../Copyright.vue'
</script>

<template>
  <footer class="footer">
    <Copyright />
  </footer>
</template>

<style scoped>
/* ---- 页脚：只做语义分区，视觉样式全在 Copyright.vue ---- */
.footer {
  flex-shrink: 0;
}
</style>