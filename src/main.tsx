import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import AppShell from './AppShell'
import TestListGroup from '@/Tests/TestListGroup';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import "./index.css";
import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoardPage'
import TestAlert from './Tests/TestAlert'
import TestButton from './Tests/TestButton'
import CartPage from './Tests/CartPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<AppShell><Outlet /></AppShell>}>
              <Route index element={<DashBoardPage />} />
              <Route path="/cartpage" element={<CartPage />} />
              <Route path="/TestListGroup" element={<TestListGroup />} />
              <Route path="/TestAlert" element={<TestAlert />} />
              <Route path="/TestButton" element={<TestButton />} />

              <Route path="*" element={<h1 className='text-3xl text-red-500'>404 Not Found</h1>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
