import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReportBug from "./pages/ReportBug";
import BugList from "./pages/BugList";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/bugs" element={<BugList />} />


          <Route
            path="/report"
            element={
              <ProtectedRoute role="User">
                <ReportBug />
              </ProtectedRoute>
            }
          />

          {/* <Route
            path="/bugs"
            element={
              <ProtectedRoute role="Developer">
                <BugList />
              </ProtectedRoute>
            }
          />*/}
        </Routes> 
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
