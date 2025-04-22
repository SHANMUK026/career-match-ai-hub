
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

console.log("Application starting - simplified core version - v1.0.8");

// Create container element
const container = document.getElementById('root');

// If container doesn't exist, create it
if (!container) {
  console.log("Creating root element");
  const newContainer = document.createElement('div');
  newContainer.id = 'root';
  document.body.appendChild(newContainer);
  
  try {
    const root = createRoot(newContainer);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering application:", error);
    newContainer.innerHTML = '<div style="color: red; padding: 20px;">An error occurred while loading the application. Please check the console for details.</div>';
  }
} else {
  console.log("Rendering to existing root element");
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering application:", error);
    container.innerHTML = '<div style="color: red; padding: 20px;">An error occurred while loading the application. Please check the console for details.</div>';
  }
}
