import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRoutes({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;

  return user ? children : <Navigate to="" />;
}

export function StaffRoutes({children}) {
  const {user, loading} = useAuth();
  if (loading) return <div>Loading...</div>

  return user.is_staff ? children : <Navigate to=''/>;

}