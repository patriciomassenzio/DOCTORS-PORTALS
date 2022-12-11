import { useEffect, useState } from 'react';
import baseUrl from '../utilities/baseUrl';

const useRole = (user) => {
    const [role, setRole] = useState('');
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const email = user.email;
            fetch(baseUrl + `/user/role/${email}`, {
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRole(data.role);
                    setRoleLoading(false);
                });
        }

    }, [user]);



    return [role, roleLoading];
};

export default useRole;