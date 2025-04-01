import React from 'react';

// propsとしてまとめて受け取る
export const Card = (props) => {
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        backgroundColor: 'yellow',
    };
    return (
        <div style={cardStyle}>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
        </div>
    );
};

