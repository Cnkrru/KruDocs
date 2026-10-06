<script setup lang="ts">
</script>

<template>
  <router-link class="logo" to="/"><p>Krudoc</p></router-link>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  text-decoration: none;
  transition: opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo p {
  font-family: "Noto Serif SC", "Songti SC", "SimSun", serif;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--g-text);
  white-space: nowrap;
  transition: opacity 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.logo:hover { opacity: 0.8; }
.logo:hover p { color: var(--g-color); }
</style>
