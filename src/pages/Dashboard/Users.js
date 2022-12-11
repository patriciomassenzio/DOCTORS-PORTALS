import React from 'react';
import PageTitle from '../Shared/PageTitle';
import baseUrl from '../../utilities/baseUrl';
import toast from 'react-hot-toast';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';

const Users = () => {
    const [users, isLoading, refetch] = useUsers();
    if (isLoading) { return <Loading /> }

    const RemoveUser = id => {
        const confirm = window.confirm('Are you sure want to remove the user?');
        if (confirm) {
            fetch(baseUrl + `/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.success) {
                        refetch();
                        toast.success('Successfuly removed.');
                    }
                });


        }

    }

    const MakeAdmin = email => {
        fetch(baseUrl + `/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`Successfuly made an admin.`);
                }
            });
    }

    const MakeDoctor = email => {
        fetch(baseUrl + `/user/doctor?doctor=${email}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    refetch();
                    toast.success(`Successfuly made a Doctor.`);
                }
            });
    }

    return (
        <div>
            <PageTitle title='Users' />
            <h2 className='text-xl mb-3 text-primary'>Users List <span className='text-sm text-neutral'>[Total: {users.length}]</span></h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) =>
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{
                                        <>
                                            <button className='btn btn-sm btn-primary mr-2'
                                                onClick={() => RemoveUser(user._id)}
                                                title='Click to Remove the user.'>Remove</button>
                                            {user.role !== 'Admin' &&
                                                <button className='btn btn-sm btn-secondary mr-2'
                                                    onClick={() => MakeAdmin(user.email)}
                                                    title='Make this user an Admin.'>Admin</button>}
                                            {user.role !== 'Doctor' &&
                                                <button className='btn btn-sm btn-warning'
                                                    onClick={() => MakeDoctor(user.email)}
                                                    title='Make this user a Doctor.'>Doctor</button>}
                                        </>
                                    }
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;