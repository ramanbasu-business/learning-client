import React from 'react'

interface ButtonComponentProps {
    children: string;
    color: 'primary' | 'secondary' | 'danger' | '';
    onClick: () => void;
}

const ButtonComponent = ({ children, color = 'primary', onClick }: ButtonComponentProps) => {
    
    let buttonClasses = "py-1 px-3 inline-flex items-center text-xs";

    switch (color) {
        case 'primary':
            buttonClasses += " bg-blue-500 hover:bg-blue-600 text-white";
            break;
        case 'secondary':
            buttonClasses += " bg-gray-500 hover:bg-gray-600 text-white";
            break;
        case 'danger':
            buttonClasses += " bg-red-500 hover:bg-red-600 text-white";
            break;
        default:
            buttonClasses += " bg-green-900 hover:bg-slate-700 text-white";
    }

    return (
        <button className={buttonClasses} onClick={onClick}>
            {children}
        </button>
    )
}

export default ButtonComponent

