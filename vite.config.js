import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
console.log('VITE_BACKEND_URL from Vite:', process.env.VITE_BACKEND_URL);

export const data= defineConfig({
  define: {
    'process.env': process.env
  }
});