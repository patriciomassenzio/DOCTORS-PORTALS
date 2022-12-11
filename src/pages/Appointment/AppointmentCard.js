import { getDate } from 'date-fns';
import React from 'react';
import toast from 'react-hot-toast';
import baseUrl from '../../utilities/baseUrl';

const AppointmentCard = ({ date, service, setBooking }) => {
    const { treatment, slots } = service;
    const currentDate = new Date();
    return (
        <div className="card shadow-lg border">
            <div className="card-body text-neutral text-center">
                <h2 className="card-title mx-auto">{treatment}</h2>
                <p>{slots.length ? slots[0] : <span className='text-error'>No slots available</span>}</p>
                <p>{slots.length} Slots Available</p>
                <div className='mx-auto mt-4'>
                    <label htmlFor="booking-modal"
                        onClick={() => {
                            if (getDate(date) > currentDate.getDate()) {
                                fetch(baseUrl + `/doctor/speciality?speciality=${treatment}`, {
                                    method: 'GET',
                                    headers: {
                                        'content-type': 'application/json',
                                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                    }
                                }).then(res => res.json()).then(data => setBooking({ ...service, doctors: data }))

                            } else {
                                setBooking(null);
                                toast.error("Invalid Date Picked! Try another date.")
                            }
                        }}
                        disabled={slots.length === 0}
                        className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white">
                        Book Appointment</label>
                </div>
            </div>
        </div>
    );
};

export default AppointmentCard;