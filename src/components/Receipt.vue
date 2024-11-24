<script setup lang="ts">
import { computed } from 'vue';
import type { ErrorState } from '../types/mbti';

const props = defineProps<{
  loading: boolean;
  data?: {
    mbti: string;
    IE_report: string;
    SN_report: string;
    TF_report: string;
    JP_report: string;
    celebrity: string;
    celebrity_report: string;
  };
  userId: string;
  error: ErrorState | null;
}>();

const currentDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).toUpperCase();
});

const currentTime = computed(() => {
  return new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
});

const orderNumber = computed(() => {
  return Math.floor(Math.random() * 10000);
});
</script>

<template>
  <div v-if="loading || data || error" 
       class="bg-white p-8 max-w-2xl mx-auto font-mono border-2 border-black shadow-lg transform transition-all duration-500"
       :class="{'animate-pulse': loading}">
    <!-- Receipt Header -->
    <div class="text-center mb-8 border-b-2 border-black pb-4">
      <h1 class="text-2xl font-bold mb-2">TWITTER MBTI RECEIPT</h1>
      <div class="text-sm">
        <p>{{ currentDate }}</p>
        <p>ORDER #{{ orderNumber.toString().padStart(4, '0') }}</p>
        <p>--------------------------------</p>
      </div>
    </div>

    <!-- Customer Info -->
    <div class="mb-6 border-b border-dashed border-black pb-4">
      <div class="flex justify-between items-center">
        <span class="font-bold">CUSTOMER ID:</span>
        <span>@{{ userId }}</span>
      </div>
      <div class="flex justify-between items-center mt-1">
        <span class="font-bold">CASHIER:</span>
        <span>twi.am</span>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8 space-y-2">
      <p class="text-lg font-bold">ANALYZING TWITTER PERSONALITY...</p>
      <p class="text-sm text-gray-600">ESTIMATED TIME: 60 SECONDS</p>
      <div class="w-full bg-gray-200 h-2 rounded-full mt-4">
        <div class="bg-black h-2 rounded-full animate-[loading_60s_linear]"></div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="border-2 border-red-500 p-4 mb-6 bg-red-50">
      <p class="text-xl font-bold mb-4 text-red-600">ERROR OCCURRED</p>
      <p class="whitespace-pre-wrap">{{ error.message }}</p>
      <p v-if="error.code" class="mt-2 text-sm text-gray-600">Error code: {{ error.code }}</p>
    </div>

    <!-- MBTI Results -->
    <template v-else-if="data">
      <!-- MBTI Type -->
      <div class="text-center border-b-2 border-black pb-4 mb-6">
        <p class="text-3xl font-bold dot-matrix">{{ data.mbti }}</p>
        <p class="text-sm mt-2">YOUR PERSONALITY TYPE</p>
      </div>

      <!-- Detailed Analysis -->
      <div class="space-y-6 mb-8">
        <div class="border-b border-dashed border-black pb-4">
          <p class="font-bold">I/E ANALYSIS:</p>
          <p class="whitespace-pre-wrap text-sm mt-2">{{ data.IE_report }}</p>
        </div>

        <div class="border-b border-dashed border-black pb-4">
          <p class="font-bold">S/N ANALYSIS:</p>
          <p class="whitespace-pre-wrap text-sm mt-2">{{ data.SN_report }}</p>
        </div>

        <div class="border-b border-dashed border-black pb-4">
          <p class="font-bold">T/F ANALYSIS:</p>
          <p class="whitespace-pre-wrap text-sm mt-2">{{ data.TF_report }}</p>
        </div>

        <div class="border-b border-dashed border-black pb-4">
          <p class="font-bold">J/P ANALYSIS:</p>
          <p class="whitespace-pre-wrap text-sm mt-2">{{ data.JP_report }}</p>
        </div>
      </div>

      <!-- Celebrity Match -->
      <div class="border-t-2 border-b-2 border-black py-4 mb-6 text-center">
        <p class="font-bold text-lg">CELEBRITY MATCH</p>
        <p class="text-xl mt-2">{{ data.celebrity }}</p>
        <p class="text-sm mt-2 whitespace-pre-wrap">{{ data.celebrity_report }}</p>
      </div>

      <!-- Footer -->
      <div class="text-center text-sm">
        <p>* * * * * * * * * * * * * * * *</p>
        <p class="mt-2">SERVED BY: Dify.ai</p>
        <p>{{ currentTime }}</p>
        <p class="mt-4">THANK YOU FOR USING OUR SERVICE</p>
        <p>* * * * * * * * * * * * * * * *</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'DotMatrix';
  src: url('../assets/fonts/DOTMATRI.TTF') format('truetype');
}

@keyframes loading {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}

.dot-matrix {
  font-family: 'DotMatrix', monospace;
}
</style>