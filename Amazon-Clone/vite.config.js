import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default {
  base: '/Amazon-Clone/',
}
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
