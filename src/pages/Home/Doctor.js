import React from 'react';

const Doctor = ({ doctor }) => {
    const { name, email, speciality, image } = doctor;

    return (
        <div className="card bg-base-100 border rounded-md">
            <figure className="px-10 pt-10">
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={image} alt={name} />
                    </div>
                </div>
            </figure>
            <div className="card-body items-start text-neutral">
                <h2 className="card-title">{name}</h2>
                <p>Email: {email}</p>
                <p>Speciality: {speciality}</p>
            </div>
        </div>
    );
};

export default Doctor;