import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink, Outlet } from 'react-router-dom';
import useRole from '../../hooks/useRole';
import auth from '../../utilities/firebase.init';
import PageTitle from '../Shared/PageTitle';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [role] = useRole(user);

    return (
        <div>
            <PageTitle title="Dashboard" />
            <div className="drawer drawer-mobile">
                <input id="side-dashboard" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col bg-gray-100 p-6">
                    {/* Dashboard content here */}

                    <Outlet />

                </div>
                <div className="drawer-side w-1/2 lg:w-full">
                    <label htmlFor="side-dashboard" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-50 bg-base-100 text-base-content overflow-y-auto">
                        {/* <!-- Sidebar content here --> */}

                        <li><Link to='/dashboard'>Profile</Link></li>
                        {role === 'Admin' &&
                            <li><NavLink to='/dashboard/my-dashboard'>Dashboard</NavLink></li>}

                        {role === 'User' || role === 'Admin' ?
                            <>
                                <li><NavLink to='/dashboard/my-appointments'>My Appointments</NavLink></li>
                                <li><NavLink to='/dashboard/appointment-history'>Appointment History</NavLink></li>
                            </> : ''
                        }
                        {role === 'Admin' &&
                            <>
                                <li><NavLink to='/dashboard/all-appointments'>All Appointments</NavLink></li>
                                <li><NavLink to='/dashboard/users'>Users</NavLink></li>
                                <li><NavLink to='/dashboard/doctors'>Doctors</NavLink></li>
                                <li><NavLink to='/dashboard/add-doctor'>Add Doctor</NavLink></li>
                            </>
                        }
                        {role === 'Doctor' &&
                            <>
                                <li><NavLink to='/dashboard/appointments'>Appointments</NavLink></li>
                            </>
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;