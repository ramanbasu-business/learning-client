import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AppShell from './AppShell'

import './index.css'

// Public pages (no auth required)
import HomePage from '@/pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogOffPage from './pages/LogOffPage'

// Protected pages (auth required)
import DashBoardPage from './pages/DashBoardPage'
import CartPage from './Tests/CartPage'
import TestListGroup from '@/Tests/TestListGroup'
import TestAlert from './Tests/TestAlert'
import TestButton from './Tests/TestButton'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* PUBLIC ROUTES - Accessible without authentication */}
          <Route index path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logoff" element={<LogOffPage />} />

          {/* PROTECTED ROUTES - Require authentication */}
          <Route element={<ProtectedRoute />}>
            {/* App shell wraps all authenticated pages with header/sidebar/layout */}
            <Route element={<AppShell><Outlet /></AppShell>}>
              {/* Main app routes */}
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/cartpage" element={<CartPage />} />

              {/* Test/demo routes */}
              <Route path="/TestListGroup" element={<TestListGroup />} />
              <Route path="/TestAlert" element={<TestAlert />} />
              <Route path="/TestButton" element={<TestButton />} />
            </Route>
          </Route>

          {/* FALLBACK - 404 for unmatched routes */}
          <Route path="*" element={<h1 className='text-3xl text-red-500'>404 Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
