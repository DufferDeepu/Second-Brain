import { Button } from './Button';
import { useNavigate } from 'react-router-dom';

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the authentication token from local storage
    localStorage.removeItem('token');
    
    // Redirect to the login page
    navigate('/signin');
  };

  return (
    <Button
      variant="secondary"
      size="md"
      className={`sm:px-4 sm:py-2 sm:text-xs md:px-6 md:py-3 md:text-sm ${className || ''}`}
      label="Logout"
      onClick={handleLogout}
    />
  );
};