import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import baseUrl from '../../utilities/baseUrl';
import auth from '../../utilities/firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const AppointmentHistory = () => {
    const [user] = useAuthState(auth);

    // Getting bookings data 
    const { data, isLoading } = useQuery('booking-history', () => fetch(baseUrl + `/booking/history?email=${user.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) { return <Loading /> }

    // Ascending sort of booking
    const bookings = data?.sort((a, b) => new Date(a.date) - new Date(b.date));


    return (
        <div>
            <PageTitle title='Appointment History' />
            <h2 className='text-xl mb-3 text-primary'>Appointment History</h2>
            <div className="overflow-x-auto text-sm">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Treatment</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Payment</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((booking, index) =>
                                <tr key={booking._id}>
                                    <th>{index + 1}</th>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.doctor}</td>
                                    <td>{format(new Date(booking.date), 'PP')}</td>
                                    <td>{booking.slot}</td>
                                    <td>{booking.payment}</td>
                                    <td>{booking.status}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentHistory;