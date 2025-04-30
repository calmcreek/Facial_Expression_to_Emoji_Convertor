import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';  // Ensure TailwindCSS is being imported
import App from './App.jsx';  // Your main app component

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
