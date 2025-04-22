
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

console.log("Application starting - simplified version without theme - v1.0.7");

try {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    console.error("Root element with id 'root' not found in the DOM");
    
    // Create root element if it doesn't exist
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
    
    console.log("Created new root element");
    
    const root = createRoot(newRoot);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.log("Root element found, rendering app");
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
} catch (e) {
  console.error("Critical error when starting the application:", e);
  
  // Attempt to show an error message on the page
  const errorDiv = document.createElement('div');
  errorDiv.style.padding = '20px';
  errorDiv.style.margin = '20px';
  errorDiv.style.border = '1px solid red';
  errorDiv.style.backgroundColor = '#ffebee';
  errorDiv.innerHTML = `
    <h2>Application Error</h2>
    <p>There was a problem starting the application. Please check the console for details.</p>
    <pre>${e instanceof Error ? e.message : 'Unknown error'}</pre>
  `;
  
  document.body.appendChild(errorDiv);
}
