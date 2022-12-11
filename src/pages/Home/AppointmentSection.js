import React from 'react';
import doctor from '../../assets/images/doctor-small.png';
import PrimaryButton from '../Shared/PrimaryButton';

const AppointmentSection = () => {
    return (
        <div className="hero my-10 appointment">
            <div className="hero-content flex-col lg:flex-row ">
                <img src={doctor} className="hidden lg:block w-3/6 mt-[-100px] mb-[-15px]" alt='Doctor' />
                <div className='lg:w-1/2 text-neutral lg:px-10 py-10'>
                    <h2 className='text-secondary text-lg font-bold pb-3'>Appointment</h2>
                    <h1 className="text-3xl font-bold text-white">Make an appointment Today</h1>
                    <p className="py-6 text-white">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <PrimaryButton to='/appointment'>Get Started</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default AppointmentSection;