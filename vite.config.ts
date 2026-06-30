import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react"; 
import dts from "vite-plugin-dts";

const root = resolve(__dirname, "src");

export default defineConfig({
  plugins: [
    react(), // Crucial: Translates your React components so Vite can build them
    dts({ insertTypesEntry: true, include: ["src"] }),
  ],

  server: {
    port: 5000,
    open: true,
    host: "0.0.0.0",
  },

  resolve: {
    alias: {
      components: resolve(root, "components"),
      config: resolve(root, "config"),
      constants: resolve(root, "constants"),
      layout: resolve(root, "layout"),
      pages: resolve(root, "pages"),
      routes: resolve(root, "routes"),
      store: resolve(root, "store"),
      services: resolve(root, "services"),
      utils: resolve(root, "utils"),
      hooks: resolve(root, "hooks"),
    },
  },

  build: {
    lib: {
      entry: resolve(root, "index.ts"), // Make sure you have src/index.ts or src/index.tsx
      name: "NepaliDatePicker",
      formats: ["es", "cjs"],
      fileName: (format) => `nepali-datepicker.${format}.js`,
    },
    rollupOptions: {
      // Cross-version protection: Borrow these from the hosting project instead of packing them
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
        "dayjs",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MaterialUI",
          "@mui/icons-material": "MuiIconsMaterial",
          "@emotion/react": "EmotionReact",
          "@emotion/styled": "EmotionStyled",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});