import React from "react";
import './CustomError.css';

function CustomError({ message }) {
    return (
        <div>
            <p className="error-message">{message}</p>
        </div>
    );
}

export default CustomError;