import React from 'react';

const InfoCard = ({ info }) => {
    const { img, title, subTitle, cardColor } = info;
    return (
        <div className={`card card-side shadow-lg ${cardColor} pl-3`}>
            <figure><img src={img} alt="Movie" /></figure>
            <div className="card-body w-3/4">
                <h2 className="card-title">{title}</h2>
                <p>{subTitle}</p>
            </div>
        </div>
    );
};

export default InfoCard;