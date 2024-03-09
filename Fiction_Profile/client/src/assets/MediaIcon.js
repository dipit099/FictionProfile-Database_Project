import React from 'react';

const MediaIcon = () => {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
        stroke="currentColor"
        strokeWidth="2" // Increase this value to make the icon thicker
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MediaIcon;