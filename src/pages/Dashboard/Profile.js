import React from 'react';
import { useAuthState, useDeleteUser } from "react-firebase-hooks/auth";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import baseUrl from '../../utilities/baseUrl';
import auth from '../../utilities/firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const Profile = () => {
    const [user, loading] = useAuthState(auth);
    const [deleteUser, dLoading] = useDeleteUser(auth);
    if (loading) { return <Loading /> }

    const handleDeleteAccount = async () => {
        const confirm = window.confirm('Are you sure want to delete account?');
        if (confirm) {
            try {
                // Deleting from database 
                const response = await fetch(baseUrl + `/user/delete/${user.email}`, {
                    method: 'DELETE',
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await response.json();
                if (data.success) {
                    const success = await deleteUser();
                    if (success) {
                        toast.success('Account deleted successfully.');
                    } else {
                        toast.error('Something error happened while deleting account.');
                    }
                }

            } catch (err) {
                console.log(err);
                toast.error('Something error happened while deleting account.');
            }

        }
    }

    return (
        <div>
            <PageTitle title='Profile' />
            <h2 className='text-xl mb-3 text-primary'>Profile</h2>

            <div className="flex items-start justify-start">
                <div className="flex flex-col justify-center items-start">
                    <div className="avatar placeholder">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-24 ring ring-primary ring-offset-base-100 ring-offset-2">
                            {user.photoURL ?
                                <img src={user.photoURL} alt={user.displayName} /> :
                                // Will display fist name 1st character
                                <span className="text-3xl"> {user.displayName.split(" ")[0][0]} </span>}
                        </div>
                    </div>
                    <h2 className='text-2xl font-semibold mt-3'>{user.displayName}</h2>
                    <h3 className='text-md font-normal mt-1'>Email: {user.email}</h3>
                </div>
            </div>
            <div className='mt-6'>
                <Link to='/dashboard/profile/change-password' className='btn btn-sm btn-primary mr-2'>Update Password</Link>

                {dLoading
                    ? <button className='btn btn-sm loading hover:bg-red-500' disabled>Delete Account</button>
                    : <button className='btn btn-sm btn-error hover:bg-red-500'
                        onClick={handleDeleteAccount}>Delete Account</button>}
            </div>
        </div>
    );
};

export default Profile;