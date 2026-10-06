<script setup lang="ts">

</script>

<template>
  <!--
    折叠箭头：展开态由外层按钮的 rotate 转到 90°，图标本身只画「朝右」
    aria-hidden —— 折叠/展开的完整语义由外层 button 的 aria-label + aria-expanded 提供，
    这里再带 aria-label 会让屏幕阅读器把「展开 电气」「折叠」读两遍，且展开态下文案还是错的
  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false">
    <polyline points="9 18 15 12 9 6" />
  </svg>
</template>

<style scoped>

</style>
