<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import UserInput from './components/UserInput.vue';
import Receipt from './components/Receipt.vue';
import GoogleAnalytics from './components/GoogleAnalytics.vue';
import ShareButton from './components/ShareButton.vue';
import SaveImageButton from './components/SaveImageButton.vue';
import { getDataFromUrl, decodeData, encodeData } from './utils/share';
import type { MBTIResponse, ErrorState } from './types/mbti.ts';

const loading = ref(false);
const mbtiData = ref<MBTIResponse['data']['outputs']>();
const currentUserId = ref('');
const error = ref<ErrorState | null>(null);
const receiptRef = ref<HTMLElement | null>(null);

onMounted(() => {
  // 检查URL中是否有分享数据
  const shareData = getDataFromUrl();
  if (shareData) {
    const decodedData = decodeData(shareData);
    if (decodedData) {
      mbtiData.value = decodedData.outputs;
      currentUserId.value = decodedData.userId;
    }
  }
});

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
      user: userId
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
      
      // Dify 响应成功后立即创建短链接
      const shortenerUrl = import.meta.env.VITE_SHORTENER_URL;
      const shortenerToken = import.meta.env.VITE_SHORTENER_TOKEN;
      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      
      if (shortenerUrl && shortenerToken) {
        // 异步创建短链接，不等待结果
        const baseUrl = `${appUrl}${window.location.pathname}`;
        const encoded = encodeData(response.data.data.outputs, userId);
        const longUrl = encoded ? `${baseUrl}?data=${encoded}` : baseUrl;

        // 始终使用相对路径，让 Vercel 处理转发
        const apiUrl = '/api/link/create';

        axios.post(apiUrl, {
          url: longUrl,
          slug: userId
        }, {
          headers: {
            'Authorization': `Bearer ${shortenerToken}`,
            'Content-Type': 'application/json'
          }
        }).catch(e => {
          console.error('Failed to create short url:', e);
        });
      }
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
      
      <template v-if="mbtiData">
        <div ref="receiptRef">
          <Receipt
            :loading="loading"
            :data="mbtiData"
            :userId="currentUserId"
            :error="error"
          />
        </div>
        <SaveImageButton :targetRef="receiptRef" />
        <ShareButton :data="mbtiData" :userId="currentUserId" />
      </template>
      <template v-else>
        <Receipt
          :loading="loading"
          :data="mbtiData"
          :userId="currentUserId"
          :error="error"
        />
      </template>

      <div class="flex justify-center items-center gap-4 mt-8">
        <a href="https://github.com/stvlynn/twi.am" target="_blank" rel="noopener noreferrer">
          <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/stvlynn/twi.am?style=flat&logo=github">
        </a>
        <a href="https://twitter.com/stv_lynn" target="_blank" rel="noopener noreferrer">
          <img alt="X (formerly Twitter) Follow" src="https://img.shields.io/twitter/follow/stv_lynn">
        </a>
        <a href="https://www.buymeacoffee.com/stvlynn" target="_blank" rel="noopener noreferrer">
          <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 20px !important;">
        </a>
        <a href="https://kimi.moonshot.cn/" target="_blank" rel="noopener noreferrer" class="inline-flex">
          <div class="bg-gray-100 rounded-md p-0.5">
            <img src="/img/kimi.svg" alt="Kimi AI" style="height: 20px !important;">
          </div>
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