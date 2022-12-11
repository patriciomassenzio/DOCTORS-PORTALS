import React from 'react';
import treatment from '../../assets/images/treatment.png';
import PrimaryButton from '../Shared/PrimaryButton';

const Banner = () => {
    return (
        <section className="hero my-20">
            <div className="hero-content flex-col lg:flex-row">
                <img src={treatment} className="w-5/6 lg:w-3/6 rounded-lg shadow-lg" alt='Treatment' />
                <div className='lg:w-1/2 lg:p-10 text-neutral'>
                    <h1 className="text-5xl font-bold">Exceptional Dental Care, on Your Terms</h1>
                    <p className="py-6">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsumis that it has a more-or-less normal distribution of letters,as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page</p>
                    <PrimaryButton to='/appointment'>Get Started</PrimaryButton>
                </div>
            </div>
        </section>
    );
};

export default Banner;