import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './config/router.jsx'
import { AuthProvider } from './context/AuthContext'
import './output.css'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <AppRouter />
  </AuthProvider>,
)
