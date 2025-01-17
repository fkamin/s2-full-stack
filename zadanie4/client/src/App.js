import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { AccountPage } from "./pages/AccountPage";
import { ProjectsPage } from "./pages/ProjectsPage"
import { LogoutPage } from "./pages/LogoutPage";

function App() {
  const token = localStorage.getItem("token")

  return (
    <Routes>
      {token && <Route path="/" element={<Navigate replace to="/projects" />} />}
      {token && <Route path="/login" element={<Navigate replace to="/" />} />}
      {token && <Route path="/register" element={<Navigate replace to="/" />} />}
      {token && <Route path="/account" element={<AccountPage />} />}
      {token && <Route path="/projects" element={<ProjectsPage />} />}
      {token && <Route path="/logout" element={<LogoutPage />} />}

      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/account" element={<Navigate replace to="/login" />} />
      <Route path="/projects" element={<Navigate replace to="/login" />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App;