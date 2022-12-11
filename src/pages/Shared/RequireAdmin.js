import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import useRole from '../../hooks/useRole';
import auth from '../../utilities/firebase.init';

const RequireAdmin = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    const [role, roleLoading] = useRole(user);

    if (loading || roleLoading) {
        return <div><svg className="animate-spin h-8 w-8 bg-primary mx-auto" viewBox="0 0 24 24"></svg></div>;
    }

    if (role !== 'Admin') {
        return <Navigate to='/dashboard' replace />;
    }
    return children;
};

export default RequireAdmin;