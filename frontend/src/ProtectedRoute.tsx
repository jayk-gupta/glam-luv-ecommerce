import React from "react";
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "./redux/user/authAPI";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data, isLoading,error} = useGetMeQuery();
  if (isLoading) return <div>Checking auth...</div>;

  // Instead of checking Redux, use direct API response
  if (error || !data?.email) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
