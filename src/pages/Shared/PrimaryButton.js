import React from 'react';
import { Link } from 'react-router-dom';

const PrimaryButton = ({ to, children }) => {
    return (
        <Link className="btn btn-primary bg-gradient-to-r from-secondary to-primary text-white"
            to={to}>{children}</Link>
    );
};

export default PrimaryButton;