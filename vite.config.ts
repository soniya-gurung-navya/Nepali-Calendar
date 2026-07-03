import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; 
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(), 
    dts({ 
      insertTypesEntry: true, 
      include: ["src"],
      exclude: ["src/App.tsx", "src/main.tsx", "src/vite-env.d.ts"],
    }),
  ],
  publicDir: false,

  server: {
    port: 5000,
    open: true,
    host: "0.0.0.0",
  },

  build: {
    // Crucial for UI elements to prevent dynamic style splitting bugs
    cssCodeSplit: false, 
    lib: {
      // Clean modern alternative: Vite can parse direct strings safely!
      entry: "src/index.ts", 
      name: "NepaliDatePicker",
      formats: ["es", "cjs"],
      fileName: (format) => `nepali-datepicker.${format}.js`,
    },
    rollupOptions: {
      // Excellent job listing react/jsx-runtime here!
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "@mui/material": "MaterialUI",
          "@mui/icons-material": "MuiIconsMaterial",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
        },
      },
    },
    sourcemap: false,
  },
});