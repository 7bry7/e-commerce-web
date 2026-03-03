import { Navigate } from 'react-router';
import { useStore, UserRole } from '../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: UserRole;
  requireAuth?: boolean;
}

export function ProtectedRoute({ 
  children, 
  requireRole, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const user = useStore((state) => state.user);

  // Check if authentication is required
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if specific role is required
  if (requireRole && user && !user.roles.includes(requireRole)) {
    // If user doesn't have the required role, redirect based on role
    if (requireRole === 'seller') {
      // User wants to access seller area but doesn't have seller role
      return <Navigate to="/become-seller" replace />;
    } else if (requireRole === 'buyer') {
      // User wants to access buyer area but doesn't have buyer role
      // This is less common, but redirect to home
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}
