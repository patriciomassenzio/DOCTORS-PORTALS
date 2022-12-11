import React from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { Link, NavLink, useLocation } from 'react-router-dom';
import auth from '../../utilities/firebase.init';

const Navbar = () => {
    const location = useLocation();
    const [user] = useAuthState(auth);
    const [signOut] = useSignOut(auth);

    const path = location.pathname;
    const menus =
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to='/appointment'>Appointment</NavLink></li>
            <li><NavLink to='/reviews'>Reviews</NavLink></li>
            {user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
            <li>{user ? <Link onClick={async () => {
                await signOut();
                localStorage.removeItem('accessToken');
            }}>Sign Out</Link> : <NavLink to='/login'>Login</NavLink>}</li>
        </>;
    return (
        <nav>
            <div className="navbar bg-base-100 text-neutral px-0 min-h-0 py-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost rounded-none hover:rounded-none lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content p-2 shadow bg-base-100 rounded-box w-52">
                            {menus}
                        </ul>
                    </div>
                    <Link to={'/'} className="text-primary font-bold normal-case text-xl">Doctors Portal</Link>
                </div>

                {path === '/dashboard' || path === '/dashboard/profile' || path === '/dashboard/my-dashboard' || path === '/dashboard/my-appointments' || path === '/dashboard/appointment-history' || path === '/dashboard/all-appointments' || path === '/dashboard/users' || path === '/dashboard/doctors' || path === '/dashboard/add-doctor'
                    ? <div className="navbar-end">
                        <label htmlFor="side-dashboard" className="btn btn-ghost drawer-button lg:hidden"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                    </div> : ''
                }

                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        {menus}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;