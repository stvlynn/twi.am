<template>
  <button
    v-if="targetRef"
    class="w-full max-w-md mx-auto mt-4 bg-black text-white py-2 rounded-lg font-mono hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
    @click="handleSave"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h-2v5.586l-1.293-1.293zM4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
    Save Image
  </button>
</template>

<script setup lang="ts">
import html2canvas from 'html2canvas';

const props = defineProps<{
  targetRef: HTMLElement | null;
}>();

const handleSave = async () => {
  if (!props.targetRef) return;

  try {
    // 创建一个新的 canvas
    const canvas = await html2canvas(props.targetRef, {
      scale: 2, // 使用2倍缩放以获得更清晰的图像
      useCORS: true, // 允许加载跨域图片
      backgroundColor: 'white', // 设置背景色为白色
      logging: false, // 禁用日志输出
    });

    // 将 canvas 转换为 blob
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob as Blob);
      }, 'image/png', 1.0);
    });

    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `twitter-mbti-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to save image:', error);
    alert('Failed to save image. Please try again.');
  }
};
</script>
