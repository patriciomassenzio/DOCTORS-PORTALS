import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import baseUrl from '../../utilities/baseUrl';
import auth from '../../utilities/firebase.init';
import Loading from '../Shared/Loading';
import PageTitle from '../Shared/PageTitle';
import toast from 'react-hot-toast';

const Appointments = () => {
    const [user] = useAuthState(auth);

    // Getting bookings data 
    const { data, isLoading, refetch } = useQuery('doctor-appointments', () => fetch(baseUrl + `/booking/appointments?doctor=${user.displayName}`, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) { return <Loading /> }

    // Ascending sort of booking
    const appointments = data?.sort((a, b) => new Date(a.date) - new Date(b.date));


    const handleConfirm = id => {
        const confirm = window.confirm('Are you sure want to confirm appointment?');
        if (confirm) {
            fetch(baseUrl + `/booking/confirm/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        refetch();
                    }
                });
        }
    }
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
            <PageTitle title='Appointments' />
            <h2 className='text-xl mb-3 text-primary'>Appointments <span className='text-sm text-neutral'>[Total: {appointments.length}]</span></h2>
            <div className="overflow-x-auto text-sm">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Sl.</th>
                            <th>Patient Name</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Slot</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments?.map((appointment, index) =>
                                <tr key={appointment._id}>
                                    <th>{index + 1}</th>
                                    <td>{appointment.patientName}</td>
                                    <td>{'0' + appointment.patientPhone}</td>
                                    <td>{format(new Date(appointment.date), 'PP')}</td>
                                    <td>{appointment.slot}</td>
                                    <td className={appointment.status === 'Confirm' ? 'text-green-500 font-semibold' : 'text-orange-600'}>
                                        {appointment.status}/<span className={appointment.payment === 'Paid' ? 'text-green-500 font-semibold' : 'text-orange-600'}>
                                            {appointment.payment}</span></td>
                                    <td>{
                                        <>
                                            {appointment.status !== 'Confirm' && <button className='btn btn-sm btn-primary mr-2'
                                                onClick={() => handleConfirm(appointment._id)}
                                                title='Click to confirm the appointment.'>Confirm</button>}
                                            <button className='btn btn-sm btn-error mr-2'
                                                onClick={() => handleCancel(appointment._id)}
                                                title='Click to cancel the appointment.'>Cancel</button>
                                        </>
                                    }</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Appointments;