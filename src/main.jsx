import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';
import { ClerkProvider } from '@clerk/react';
import AppProvider from './context/AppContext.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if(!PUBLISHABLE_KEY) throw new Error('Add your Clerk Publishable Key to the .env File!')
// console.log(PUBLISHABLE_KEY)

createRoot(document.getElementById('root')).render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} secretafterSignOutUrl="/">
      <BrowserRouter>
        <AppProvider>
          <App/>
        </AppProvider>
      </BrowserRouter>
    </ClerkProvider>
)
