
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Enhanced build optimization
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Group dependencies into chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['@radix-ui/react-slot', '@radix-ui/react-avatar'],
          'utils': ['clsx', 'tailwind-merge', 'class-variance-authority']
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit for better bundling
    sourcemap: false // Disable sourcemaps in production for smaller files
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'] // Prebuilt deps for faster dev startup
  }
}));
