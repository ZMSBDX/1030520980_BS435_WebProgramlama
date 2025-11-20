import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from "./components/AuthContext.tsx";
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
