import React from 'react';
import er from './error.gif';
import './error.css';

const ErrorMessage = () => {
    
    return (
            
             <img src={er} className='error-image' alt="error img"/>
        
    )
};

export default ErrorMessage;