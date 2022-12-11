import React from 'react';
import stethos from '../../assets/images/stethos.jpg';
import PrimaryButton from '../Shared/PrimaryButton';

const Hero = () => {
    return (
        <section className='hero-section'>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row ">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-neutral">Find Best Doctors</h1>
                        <h1 className="text-4xl lg:text-5xl font-bold text-neutral">Book Appointment</h1>
                        <p className="py-8 text-neutral">We offer an online based doctors appointment service with the facility of an electronic personal health record system, the first of its kind in our country.</p>
                        <PrimaryButton to='/appointment'>Get Started</PrimaryButton>
                    </div>
                    <img src={stethos} className="lg:w-1/2 rounded-lg shadow-lg" alt='Chair' />
                </div>
            </div>
        </section>
    );
};

export default Hero;