import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    // server: {
    //     hmr: {
    //         protocol: 'ws',
    //         host: 'localhost'
    //     },
    //     watch: {
    //         usePolling: true
    //     }
    // },
    // rules: [
    //     {
    //         test: /\.vue$/,
    //         loader: 'vue-loader',
    //         options: {
    //             hotReload: true // disables Hot Reload
    //         }
    //     }
    // ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
