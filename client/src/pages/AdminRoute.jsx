import { Navigate } from 'react-router-dom';
import { UserContext } from '../store/UserContext';
import { useContext } from 'react';
function AdminRoute({ children }) {
    const { user } = useContext(UserContext);

  if (!user) {
    // If the user is not authenticated, redirect to login
    return <Navigate to="/login" />;
  }

  if (user.role !== 'admin') {
    // If the user is not an admin, redirect to home
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the children components
  return children;
}
export default AdminRoute;