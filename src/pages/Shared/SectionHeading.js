import React from 'react';

const SectionHeading = (props) => {
    const { title, subTitle, textColor = 'text-neutral' } = props;
    return (
        <>
            <h3 className='text-secondary font-bold text-xl'>{title}</h3>
            <h2 className={`text-3xl ${textColor}`}>{subTitle}</h2>
        </>
    );
};

export default SectionHeading;