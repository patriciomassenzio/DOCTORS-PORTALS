import React from 'react';
import SectionHeading from '../Shared/SectionHeading';
import quote from '../../assets/icons/quote.svg';
import Testimonial from './Testimonial';
import { users } from '../../utilities/fakedata';

const Testimonials = () => {
    return (
        <section className='my-16 px-4 lg:px-8'>
            <div className='flex justify-between items-center mb-10'>
                <div><SectionHeading title={'Testimonial'} subTitle={'What Our Patients Says'} /></div>
                <img src={quote} className='w-1/6' alt="Quote" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {
                    users.map(user => <Testimonial
                        key={user.id}
                        user={user}
                    />)
                }
            </div>

        </section>
    );
};

export default Testimonials;