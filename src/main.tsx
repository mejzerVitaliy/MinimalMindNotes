import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { AuthProvider } from './components/AuthProvider.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
    
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>    
    </React.StrictMode>
)
