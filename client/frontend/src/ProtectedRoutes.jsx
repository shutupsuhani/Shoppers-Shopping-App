import { Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext'; // Adjust the import path as necessary

const ProtectedRoutes = ({ element, ...rest }) => {
  const { currentUser } = useAuth(); // Get the current user from your auth context

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoutes;
