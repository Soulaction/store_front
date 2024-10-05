import React from 'react';
import s from './Button.module.css';

type ButtonProps = {
    children: string;
    className: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({children, className, ...props}: ButtonProps) => {
    const classes: string[] = [s.btn];
    className && classes.push(className);

    return (
        <button className={classes.join(' ')} {...props}>
            {children}
        </button>
    );
};

export default Button;
