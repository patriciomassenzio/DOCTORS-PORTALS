import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import baseUrl from '../../utilities/baseUrl';
import auth from '../../utilities/firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import toast from 'react-hot-toast';

const MyAppointments = () => {
    const [user] = useAuthState(auth);

    // Getting bookings data 
    const { data, isLoading, refetch } = useQuery('bookings', () => fetch(baseUrl + `/booking?email=${user?.email}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) { return <Loading /> }

    // Ascending sort of booking
    const bookings = data?.sort((a, b) => new Date(a.date) - new Date(b.date));


    const handleCancel = id => {
        const confirm = window.confirm('Are you sure want to cancel booking?');
        if (confirm) {
            fetch(baseUrl + `/booking/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.success) {
                        refetch();
                        toast.success(`Cancelled booking for ${data.deletedBooking.treatment}`);

                        // Post to BookingHistory 
                        const { patientEmail, treatment, doctor, date, slot, payment } = data.deletedBooking;
                        fetch(baseUrl + '/booking/history', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify({ patientEmail, treatment, doctor, date, slot, payment })
                        }).then(res => res.json())
                    }
                });
        }
    }
    const handlePay = id => {
        fetch(baseUrl + `/booking/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    refetch();
                    toast.success(`Payment done for ${data.bookingPayment.treatment}`)
                }
            });
    }

    return (
        <div>
            <PageTitle title='My Appointments' />
            <h2 className='text-xl mb-3 text-primary'>My Appointments <span className='text-sm text-neutral'>[Total: {bookings.length}]</span></h2>
            <div className="overflow-x-auto text-sm">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Treatment</th>
                            <th>Doctor</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Status</th>
                            <th>Action</th>
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
                                    <td className={booking.status === 'Confirm' ? 'text-green-500' : 'text-orange-600'}>
                                        {booking.status}/<span className={booking.payment === 'Paid' ? 'text-green-500' : 'text-orange-600'}>
                                            {booking.payment}</span></td>

                                    <td>{<button className='btn btn-sm btn-warning mr-2'
                                        onClick={() => handlePay(booking._id)}
                                        disabled={booking.payment === 'Paid'}
                                        title='Click to Pay.'>Pay</button>}

                                        {<button className='btn btn-sm btn-primary'
                                            onClick={() => handleCancel(booking._id)}
                                            title='Click to cancel the appointment.'>Cancel</button>}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;