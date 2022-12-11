import React from 'react';
import useBookings from '../../hooks/useBookings';
import useDoctors from '../../hooks/useDoctors';
import useUsers from '../../hooks/useUsers';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const MyDashboard = () => {
    const [doctors, isLoading] = useDoctors();
    const [users] = useUsers();
    const [bookings] = useBookings();
    if (isLoading) { return <Loading /> }
    const paidBookings = bookings?.filter(b => b.payment === 'Paid');

    return (
        <div>
            <PageTitle title='Dashboard' />
            <h2 className='text-xl mb-3 text-primary'>Dashboard </h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                <div className='bg-primary p-4 rounded-lg'>
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-gray-700">{users?.length}</div>
                    <div className="stat-desc">Till Date</div>
                </div>

                <div className='bg-primary p-4 rounded-lg'>
                    <div className="stat-title">Doctors</div>
                    <div className="stat-value text-gray-700">{doctors?.length}</div>
                    <div className="stat-desc">Till Date</div>
                </div>

                <div className='bg-primary p-4 rounded-lg'>
                    <div className="stat-title">Total Appointments</div>
                    <div className="stat-value text-gray-700">{bookings?.length}</div>
                    <div className="stat-desc">Till Date</div>
                </div>
                <div className='bg-primary p-4 rounded-lg'>
                    <div className="stat-title">Payments</div>
                    <div className="stat-value text-gray-700">{paidBookings?.length}
                        /<span className='text-gray-500'>{bookings?.length - paidBookings?.length}</span></div>
                    <div className="stat-desc">Paid/Unpaid</div>
                </div>

            </div>
        </div>
    );
};

export default MyDashboard;