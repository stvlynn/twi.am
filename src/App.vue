<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import UserInput from './components/UserInput.vue';
import Receipt from './components/Receipt.vue';
import GoogleAnalytics from './components/GoogleAnalytics.vue';
import type { MBTIResponse, ErrorState } from './types/mbti.ts';

const loading = ref(false);
const mbtiData = ref<MBTIResponse['data']['outputs']>();
const currentUserId = ref('');
const error = ref<ErrorState | null>(null);

const analyzeMBTI = async (userId: string) => {
  loading.value = true;
  currentUserId.value = userId;
  mbtiData.value = undefined;
  error.value = null;

  // 获取环境变量
  const apiUrl = import.meta.env.VITE_DIFY_API_URL || 'https://api.dify.ai/v1/workflows/run';
  const apiKey = import.meta.env.VITE_DIFY_API_KEY;

  if (!apiKey) {
    error.value = {
      message: 'API key is not configured',
      code: 'CONFIG_ERROR'
    };
    loading.value = false;
    return;
  }

  try {
    const response = await axios.post(apiUrl, {
      inputs: {
        lang: navigator.language || 'en',
        user_id: userId
      },
      response_mode: "blocking",
      user: "abc-123"
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 180000 // 180 seconds timeout
    });

    // 检查响应数据
    console.log('Response:', response.data);
    
    if (response.data?.data?.status === 'succeeded' && 
        response.data?.data?.outputs) {
      mbtiData.value = response.data.data.outputs;
    } else if (response.data?.data?.error) {
      throw new Error(response.data.data.error);
    } else {
      console.error('Unexpected response structure:', response.data);
      throw new Error('Invalid response format. Please check console for details.');
    }

    // 验证所有必需的字段是否存在
    const requiredFields = ['mbti', 'IE_report', 'SN_report', 'TF_report', 'JP_report', 'celebrity', 'celebrity_report'];
    const missingFields = requiredFields.filter(field => !mbtiData.value?.[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
  } catch (e) {
    console.error('Error:', e);
    if (axios.isAxiosError(e)) {
      const errorMessage = e.response?.data?.message || e.message || 'Failed to analyze Twitter profile';
      error.value = {
        message: errorMessage,
        code: e.response?.status?.toString() || e.code || 'UNKNOWN'
      };
    } else {
      error.value = {
        message: e instanceof Error ? e.message : 'An unexpected error occurred',
        code: 'UNKNOWN'
      };
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4">
    <GoogleAnalytics />
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl dot-matrix text-center mb-8">Twitter MBTI Receipt</h1>
      <UserInput @analyze="analyzeMBTI" :disabled="loading" />
      <Receipt
        :loading="loading"
        :data="mbtiData"
        :userId="currentUserId"
        :error="error"
      />
      
      <div class="flex justify-center items-center gap-4 mt-8">
        <a href="https://github.com/stvlynn/twi.am" target="_blank" rel="noopener noreferrer">
          <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/stvlynn/twi.am?style=flat&logo=github">
        </a>
        <a href="https://twitter.com/stv_lynn" target="_blank" rel="noopener noreferrer">
          <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/stv_lynn">
        </a>
      </div>
    </div>
  </div>
</template>

<style>
@import './style.css';

@font-face {
  font-family: 'DotMatrix';
  src: url('./assets/fonts/DOTMATRI.TTF') format('truetype');
}

.dot-matrix {
  font-family: 'DotMatrix', monospace;
}
</style>