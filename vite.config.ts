import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api/link': {
          target: env.VITE_SHORTENER_URL,
          changeOrigin: true,
          secure: false,
          headers: {
            'Origin': env.VITE_APP_URL
          }
        }
      }
    }
  }
})
