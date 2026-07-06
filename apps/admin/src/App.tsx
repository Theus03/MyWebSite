import { Navigate, Route, Routes } from "react-router-dom";
import { AdminLayout } from "./components/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { ClientList } from "./pages/ClientList";
import { ClientDetail } from "./pages/ClientDetail";
import { SystemDetail } from "./pages/SystemDetail";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ClientList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients/:clientId"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ClientDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients/:clientId/systems/:systemId"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SystemDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
