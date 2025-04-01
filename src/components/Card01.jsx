import React from 'react';

export const Card = ({ title, content }) => {
    return (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
            <h3>{title}</h3>
            <p>{content}</p>
        </div>
    );
};

