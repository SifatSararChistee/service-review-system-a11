import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicTittle = () => {

  const location = useLocation();

  const routeTitles = {
    '/': 'Trustify Home',
    '/all-services': 'Trustify Services',
    '/add-service': 'Add Services to Trustify',
    '/my-services': 'Your Services',
    '/my-reviews': 'Your Reviews ',
    '/login': 'Trustify User Login',
    '/register': 'Register Your Account to Trustify',
  };

  useEffect(() => {
    const currentTitle = routeTitles[location.pathname] || 'Trustify';

    document.title = currentTitle;
  }, [location]);

  return null; // No UI rendering
};


export default DynamicTittle;
