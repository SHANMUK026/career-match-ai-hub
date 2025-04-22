
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

console.log("Application starting - v1.0.3");

// Add custom CSS for video call features
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
  `;
  document.head.appendChild(style);
};

const rootElement = document.getElementById("root");

if (rootElement) {
  console.log("Root element found, mounting React application");
  const root = createRoot(rootElement);
  
  // Add error boundary to catch and display rendering errors
  try {
    // Add custom styles for video calling
    addCustomStyles();
    
    console.log("Rendering React application");
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React application mounted successfully");
  } catch (error) {
    console.error("Failed to render application:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
        <h2>Something went wrong</h2>
        <p>The application couldn't be loaded. Please try refreshing the page.</p>
        <pre style="background: #f5f5f5; padding: 10px; text-align: left; overflow: auto; margin-top: 20px; border-radius: 4px;">${error instanceof Error ? error.message : String(error)}</pre>
        <button onclick="window.location.reload()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;">
          Refresh Page
        </button>
      </div>
    `;
  }
} else {
  console.error("Root element not found. DOM might not be fully loaded or element with id 'root' doesn't exist.");
  document.body.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: system-ui, sans-serif;">
      <h2>Unable to load application</h2>
      <p>The application container was not found. Please try refreshing the page or contact support if the issue persists.</p>
      <button onclick="window.location.reload()" style="padding: 8px 16px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 16px;">
        Refresh Page
      </button>
    </div>
  `;
}
