import React from 'react';

const Service = ({ service }) => {
    const { img, title, subTitle } = service;

    return (
        <div className="card bg-base-100 shadow-md border">
            <figure className="mt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body px-2 items-center text-center text-neutral">
                <h2 className="card-title">{title}</h2>
                <p>{subTitle}</p>
            </div>
        </div>
    );
};

export default Service;