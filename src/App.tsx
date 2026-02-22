import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
import { ActivityProvider } from './contexts/ActivityContext'
import { TasksProvider } from './contexts/TasksContext'
import { TeamProvider } from './contexts/TeamContext'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TaskDashboardPage } from './pages/TaskDashboardPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProductSearchPage } from './pages/ProductSearchPage'
import { MultiStepRegistrationPage } from './pages/MultiStepRegistrationPage'
import { TeamDashboardPage } from './pages/TeamDashboardPage'
import { useUser } from './contexts/UserContext'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useUser()
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <ActivityProvider>
            <TasksProvider>
              <TeamProvider>
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
                  <Route
                    path="/team"
                    element={
                      <ProtectedRoute>
                        <TeamDashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </TeamProvider>
            </TasksProvider>
          </ActivityProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
