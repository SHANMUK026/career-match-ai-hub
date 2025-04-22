
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

console.log("Application starting - v1.0.5");

// Add custom CSS for various features
const addCustomStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Video call animations */
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 0.8; }
      50% { transform: scale(1.2); opacity: 0.4; }
      100% { transform: scale(0.8); opacity: 0.8; }
    }
    
    @keyframes micro-bounce {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .animate-pulse-ring {
      animation: pulse-ring 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
    }
    
    .animate-micro-bounce {
      animation: micro-bounce 1s ease-in-out infinite;
    }
    
    /* Transition for height changes */
    .transition-height {
      transition-property: height;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Fix for dark mode transitions */
    html.dark * {
      transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }
    
    /* Ensure body always takes full height */
    html, body, #root {
      height: 100%;
      margin: 0;
      padding: 0;
    }
  `;
  document.head.appendChild(style);
};

// Helper function to show error UI
const showErrorUI = (rootElement, error) => {
  console.error("Application error:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
      <h2 style="color: #e11d48;">Something went wrong</h2>
      <p>The application couldn't be loaded. Please try refreshing the page.</p>
      <div style="background: #f5f5f5; padding: 10px; text-align: left; overflow: auto; margin-top: 20px; border-radius: 4px; max-height: 200px;">
        <code style="white-space: pre-wrap; font-family: monospace;">${error instanceof Error ? error.message : String(error)}</code>
      </div>
      <button onclick="window.location.reload()" style="padding: 8px 16px; background: #2563eb; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;">
        Refresh Page
      </button>
    </div>
  `;
};

// Render the application
(function renderApp() {
  console.log("Starting render process");
  
  try {
    // Find root element
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error("Root element with id 'root' not found in the DOM");
    }
    
    console.log("Root element found, adding custom styles");
    
    // Add custom styles
    addCustomStyles();
    
    // Create React root instance
    console.log("Creating React root and mounting application");
    const root = createRoot(rootElement);
    
    // Render the application
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    console.log("React application mounted successfully");
  } catch (error) {
    console.error("Failed to render application:", error);
    
    // Try to find root element again (in case error occurred before finding it)
    const rootElement = document.getElementById("root") || document.body;
    showErrorUI(rootElement, error);
  }
})();
