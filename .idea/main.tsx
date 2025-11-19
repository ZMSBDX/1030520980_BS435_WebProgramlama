import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../BS435_WebProgramlama_I/apps/2025/app2/src/index.css'
import App from './App.tsx'
import {AuthProvider} from "../../BS435_WebProgramlama_I/apps/2025/app2/src/AuthContext.tsx";
import {BrowserRouter} from "react-router";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </AuthProvider>
  </StrictMode>
)
