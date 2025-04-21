
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
    react({
      // SWC options for the react plugin
      // Removing the jsxRuntime property as it's not supported
    }),
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
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Group dependencies into chunks for better caching
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'react-vendor';
            }
            if (id.includes('@radix-ui')) {
              return 'ui-components';
            }
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            return 'vendor'; // All other dependencies
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit for better bundling
    sourcemap: false, // Disable sourcemaps in production for smaller files
    target: 'esnext', // Target modern browsers for better performance
    assetsInlineLimit: 4096, // Inline small assets
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'framer-motion',
      '@radix-ui/react-switch',
      '@radix-ui/react-toggle',
      'lucide-react'
    ], // Prebuilt deps for faster dev startup
    esbuildOptions: {
      jsx: 'automatic', // Use automatic JSX runtime
    }
  },
  esbuild: {
    jsx: 'automatic', // Use automatic JSX runtime
    legalComments: 'none', // Remove legal comments to reduce size
    treeShaking: true, // Enable tree shaking
  }
}));
