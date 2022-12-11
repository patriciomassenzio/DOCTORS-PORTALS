import { format } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';
import useBookings from '../../hooks/useBookings';
import baseUrl from '../../utilities/baseUrl';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';

const AllAppointments = () => {
    // Getting bookings data 
    const [data, isLoading, refetch] = useBookings();
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

    return (
        <div>
            <PageTitle title='All Appointments' />
            <h2 className='text-xl mb-3 text-primary'>All Appointments <span className='text-sm text-neutral'>[Total: {bookings.length}]</span></h2>
            <div className="overflow-x-auto text-sm">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Patient</th>
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
                                    <td>{booking.patientName}</td>
                                    <td>{booking.treatment}</td>
                                    <td>{booking.doctor}</td>
                                    <td>{format(new Date(booking.date), 'PP')}</td>
                                    <td>{booking.slot}</td>
                                    <td className={booking.status === 'Confirm' ? 'text-green-500' : 'text-orange-600'}>
                                        {booking.status}/<span className={booking.payment === 'Paid' ? 'text-green-500' : 'text-orange-600'}>
                                            {booking.payment}</span></td>

                                    <td>{<button className='btn btn-sm btn-primary'
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

export default AllAppointments;