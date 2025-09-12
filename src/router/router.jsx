import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Dashboard from "../pages/Dashboard";
import AuthPage from "../pages/AuthPage";
import AdminPage from "../pages/AdminPage";
import PageNotFound from "../pages/404";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import Loader from "../components/modules/Loader";

function router() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  
  // if (data) console.log(data.data.role);

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/dashboard"
        element={data ? <Dashboard /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default router;
