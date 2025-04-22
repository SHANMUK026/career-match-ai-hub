
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

// For debugging
console.log("Application starting...");

const rootElement = document.getElementById("root");

if (rootElement) {
  console.log("Root element found, mounting React application");
  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found. DOM might not be fully loaded or element with id 'root' doesn't exist.");
}
