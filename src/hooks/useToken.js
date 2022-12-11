import { useEffect, useState } from "react";
import baseUrl from "../utilities/baseUrl";

const useToken = (currentUser) => {
    const [token, setToken] = useState('');

    useEffect(() => {
        if (currentUser) {
            const user = currentUser.user;
            // JWT Token Verification 
            fetch(baseUrl + '/user/verify-token', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email: user.email })
            }).then(res => res.json())
                .then(data => {
                    const accessToken = data.accessToken;
                    localStorage.setItem('accessToken', accessToken)
                    setToken(accessToken);
                })
                .catch(err => console.log(err.message));


            // Insert/Update a user 
            fetch(baseUrl + '/user', {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then(res => res.json())
                .then();

        }

    }, [currentUser]);


    return [token];
};

export default useToken;