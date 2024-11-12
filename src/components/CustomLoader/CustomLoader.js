import React from 'react';
import './CustomLoader.css';
import {TailSpin} from 'react-loader-spinner';

function CustomLoader() {
    return (
        <div className="loader-container">
            <TailSpin color="#FF6347" height={80} width={80} />
        </div>
    );
}

export default CustomLoader;