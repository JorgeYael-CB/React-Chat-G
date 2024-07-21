import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Routes } from './presentation/router'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ Routes }/>
    <App />
  </React.StrictMode>,
)
