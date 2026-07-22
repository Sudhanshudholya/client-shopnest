import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const { user } = useContext(AuthContext);

  // No user login
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  // Login hai lekin Admin nahi he
  if (user.user.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  return  children ;
};

export default AdminRoute