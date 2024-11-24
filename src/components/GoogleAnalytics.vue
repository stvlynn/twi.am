<!-- src/components/GoogleAnalytics.vue -->
<template>
  <!-- Google Analytics component -->
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const gaId = import.meta.env.VITE_GA_ID;

onMounted(() => {
  if (gaId) {
    // 创建并添加 Google Analytics 脚本
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gtagScript);

    // 初始化 Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId);
  }
});
</script>

<script lang="ts">
// 为 window.dataLayer 添加类型定义
declare global {
  interface Window {
    dataLayer: any[];
  }
}
</script>
