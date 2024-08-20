import { useAuthContext } from 'context/authContext';
import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean; // optional로 만듦
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
}
