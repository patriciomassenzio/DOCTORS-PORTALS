import React from 'react';
import PageTitle from '../Shared/PageTitle';

const About = () => {
    return (
        <div>
            <PageTitle title="About Us" />
            <div className='min-h-screen flex items-center justify-center'>
                <h2 className='text-2xl'>This is About Page</h2>
            </div>
        </div>
    );
};

export default About;