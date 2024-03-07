// DownvoteIcon.js
import React from 'react';

const DownvoteIcon = ({ filled }) => {
    console.log("filled " + filled);
    return (
        <svg
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
            fill={filled ? 'white' : 'none'}
            stroke={'white'}
            strokeWidth="1"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10c.381.475 1.181.475 1.562 0l8-10A1.001 1.001 0 0 0 20 10z" />
        </svg>

    );
};

export default DownvoteIcon;
