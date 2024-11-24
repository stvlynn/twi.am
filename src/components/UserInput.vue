<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'analyze', userId: string): void;
}>();

const userId = ref('');

const handleSubmit = () => {
  if (userId.value.trim()) {
    emit('analyze', userId.value.trim());
  }
};
</script>

<template>
  <div class="w-full max-w-md mx-auto mb-8">
    <div class="flex flex-col gap-4">
      <div class="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-gray-500">
        <span class="px-3 text-gray-500 bg-gray-50 h-full flex items-center border-r border-gray-300">@</span>
        <input
          v-model="userId"
          type="text"
          class="flex-1 px-3 py-2 font-mono focus:outline-none"
          placeholder="Twitter ID"
          @keyup.enter="handleSubmit"
        />
      </div>
      <button
        @click="handleSubmit"
        class="w-full bg-black text-white py-2 rounded-lg font-mono hover:bg-gray-800 transition-colors"
      >
        ANALYZE MBTI
      </button>
    </div>
  </div>
</template>