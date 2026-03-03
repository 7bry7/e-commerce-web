import { ProtectedRoute } from '../components/ProtectedRoute';
import CartPage from '../pages/CartPage';
import UserDashboard from '../pages/UserDashboard';
import CreatorDashboard from '../pages/CreatorDashboard';
import BecomeSellerPage from '../pages/BecomeSellerPage';

export function ProtectedCartPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <CartPage />
    </ProtectedRoute>
  );
}

export function ProtectedUserDashboard() {
  return (
    <ProtectedRoute requireRole="buyer">
      <UserDashboard />
    </ProtectedRoute>
  );
}

export function ProtectedCreatorDashboard() {
  return (
    <ProtectedRoute requireRole="seller">
      <CreatorDashboard />
    </ProtectedRoute>
  );
}

export function ProtectedBecomeSellerPage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <BecomeSellerPage />
    </ProtectedRoute>
  );
}
