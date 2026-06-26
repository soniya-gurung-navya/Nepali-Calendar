import { defineConfig, esmExternalRequirePlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     dts({  insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
        exclude: ['src/App.tsx', 'src/main.tsx'],
           }),
            esmExternalRequirePlugin({
      external: [
        'react',
        'react-dom',
        '@mui/material',
        '@mui/x-date-pickers',
        '@emotion/react',
        '@emotion/styled',
      ],
    }),
          ],
  server: {
    port: 5000,
    open: true,
    host: true
  },
    build: {
      copyPublicDir: false, 
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'NepaliDatepicker',
      fileName: (format) => `nepali-datepicker.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
    },
  },
  
})
