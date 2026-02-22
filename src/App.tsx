import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TaskDashboardPage } from './pages/TaskDashboardPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProductSearchPage } from './pages/ProductSearchPage'
import { MultiStepRegistrationPage } from './pages/MultiStepRegistrationPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuth = sessionStorage.getItem('auth') === 'true'
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/multi-step" element={<MultiStepRegistrationPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TaskDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<ProductSearchPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
