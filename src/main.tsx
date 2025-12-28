import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// index.css satırını sildik çünkü hata veriyordu
// AuthContext satırını sildik çünkü dosyayı kaldırmıştık

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)