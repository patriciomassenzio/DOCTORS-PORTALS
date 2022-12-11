import React from 'react';

const Testimonial = (props) => {
    const { name, address, img, review } = props.user;

    return (
        <div className="card bg-base-100 border rounded-md">
            <div className="card-body text-neutral">
                <p className='mb-6'>{review}</p>
                <div className="flex items-center">
                    <div className="avatar">
                        <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={img} alt={name} />
                        </div>
                    </div>
                    <div className='pl-4'>
                        <h4 className='font-bold'>{name}</h4>
                        <p>{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;