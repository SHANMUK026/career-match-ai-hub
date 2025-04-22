
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

console.log("Application starting without theme - v1.0.6");

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found in the DOM");
}

const root = createRoot(rootElement);
    
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
