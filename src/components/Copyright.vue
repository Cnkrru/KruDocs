<script setup lang="ts">
</script>

<template>
  <footer class="copyright">
    <div class="copyright-inner">
      <span>&copy; 2026 Krudoc &middot; Vue 3 驱动</span>
    </div>
  </footer>
</template>

<style scoped>
.copyright {
    border-top: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
    padding: 24px;
    background: color-mix(in srgb, var(--g-bg) 92%, var(--g-text));
    position: relative;
}

.copyright::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 48px;
    height: 2px;
    background: var(--g-color);
    border-radius: 0 0 1px 1px;
    opacity: 0.4;
}

.copyright-inner {
    max-width: 820px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    font-size: 0.8125rem;
}

.copyright a {
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.copyright a:hover { color: var(--g-color); }

@media (max-width: 768px) {
    .copyright-inner {
        flex-direction: column;
        text-align: center;
        gap: 8px;
    }
}
</style>
