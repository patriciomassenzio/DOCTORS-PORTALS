import React from 'react';
import { info } from '../../utilities/fakedata';
import InfoCard from './InfoCard';

const Info = () => {

    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-4'>
            {
                info.map(info => <InfoCard
                    key={info.id}
                    info={info}
                />)
            }
        </section>
    );
};

export default Info;