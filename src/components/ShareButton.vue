<template>
  <button
    v-if="show"
    @click="handleShare"
    class="w-full max-w-md mx-auto mt-4 bg-black text-white py-2 rounded-lg font-mono hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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
  try {
    const shareUrl = await getShareUrl(props.data, props.userId);
    
    if (navigator.share) {
      // 使用系统分享菜单
      await navigator.share({
        title: 'Twitter MBTI Receipt',
        text: `Check out my Twitter MBTI Receipt: ${props.data.mbti}`,
        url: shareUrl
      });
    } else {
      // 复制到剪贴板
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    }
  } catch (e) {
    console.error('Failed to share:', e);
    try {
      const shareUrl = await getShareUrl(props.data, props.userId);
      await navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    } catch {
      alert('Failed to copy share link. Please try again.');
    }
  }
};
</script>
