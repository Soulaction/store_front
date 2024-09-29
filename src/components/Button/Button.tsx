import React from 'react';
import s from './Button.module.css';

interface ButtonProps {
    children: string;
}

const Button = ({children, ...props}: ButtonProps) => {
    return (
        <button className={s.btn} {...props}>
            {children}
        </button>
    );
};

export default Button;
