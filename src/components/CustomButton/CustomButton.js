import React from "react";
import './CustomButton.css';

function CustomButton({ title, backgroundColor, textColor, width, onClick }) {
    const buttonStyle = {
        backgroundColor: backgroundColor || '#007bff',
        color: textColor || 'white',
        width: width || '100%'
    };

    return (
        <div>
            <button
                className="button"
                onClick={onClick}
                style={buttonStyle}
            >
                {title}
            </button>
        </div>
    );
}

export default CustomButton;