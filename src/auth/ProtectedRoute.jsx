import { Children, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const { user, loading } = useContext(AuthContext);



  // No user login
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  // User login
  return  children ;

};

export default ProtectedRoute