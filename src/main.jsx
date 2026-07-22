import React from "react"
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './service/store.js';
import { AuthProvider } from './context/AuthContext.jsx';
import "./styles/global.css"

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
    <Toaster/>
  </Provider>
)
