import React from 'react';
import Service from './Service';
import SectionHeading from '../Shared/SectionHeading';
import { services } from '../../utilities/fakedata';

const Services = () => {
    return (
        <section className='my-20 px-4 lg:px-8'>
            <div className="text-center mb-16">
                <SectionHeading title={'Our Services'} subTitle={'Services We Provide'} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                {
                    services.map(service => <Service
                        key={service.id}
                        service={service}
                    />)
                }
            </div>
        </section>
    );
};

export default Services;