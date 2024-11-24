<template>
  <button
    v-if="show"
    @click="handleShare"
    class="w-full max-w-md mx-auto mt-4 bg-blue-600 text-white py-2 rounded-lg font-mono hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
    </svg>
    Share Result
  </button>
</template>

<script setup lang="ts">
import type { MBTIResponse } from '../types/mbti';
import { getShareUrl } from '../utils/share';
import { computed } from 'vue';

const props = defineProps<{
  data?: MBTIResponse['data']['outputs'];
  userId: string;
}>();

const show = computed(() => !!props.data?.mbti);

const handleShare = async () => {
  if (!props.data) return;
  
  const shareUrl = getShareUrl(props.data, props.userId);
  
  try {
    if (navigator.share) {
      // 移动设备使用原生分享
      await navigator.share({
        title: 'My Twitter MBTI Result',
        text: `Check out @${props.userId}'s Twitter MBTI personality type: ${props.data.mbti}!`,
        url: shareUrl
      });
    } else {
      // 桌面设备复制链接
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    }
  } catch (e) {
    console.error('Failed to share:', e);
    // 如果分享失败，回退到复制链接
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy share link. Please try again.');
    }
  }
};
</script>
