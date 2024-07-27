import { useContext } from 'react';
import { Navigate } from 'react-router-dom'

import UserContext from './UserContext';


/**ProtectedRoute Component 
 
This component will check if there is a valid current user
and only continues to the route if so. If no user is present, redirects to login form. 
*/

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to='/login' />
    }

    return children
}

export default ProtectedRoute;
