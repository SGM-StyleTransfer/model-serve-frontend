import React, { PropsWithChildren } from 'react';
import { ButtonProps, StyledProps } from 'utils/types';

export function PageWrapper({children, className}: StyledProps ) {
    return (
        <div className={` 
            ${className} 
            max-w-screen-xl mx-auto  
            px-8 py-12 text-center flex flex-col items-center
        `} >
            {children}
        </div>
    )
}

export function InputContainer({children}: PropsWithChildren) {
    return (
        <div className='ring-1 ring-slate-900 h-full p-4 mx-4 bg-white'> 
            {children}
        </div>
    )
}

export function InputTitle({children}: PropsWithChildren) {
    return (
        <h1 className='text-3xl whitespace-nowrap mb-4' > 
            {children} 
        </h1>
    )
}

export function PageTitle({children}: PropsWithChildren) {
    return (
        <h1 className='text-5xl mb-6 text-slate-700 cursor-default ' > 
            {children}
        </h1>
    )
}

export function PageDescription({children}: PropsWithChildren) {
    return (
        <h4 className='mb-10 cursor-default text-slate-600' >
            {children}    
        </h4>
    )
}

export function KeyButton({children, onClick}: ButtonProps) {
    return (
        <button 
            className='
                mt-4 py-4 px-12 rounded-full bg-orange-500 text-white 
                hover:bg-orange-400 transition-colors duration-300'
            onClick={onClick} >
                {children}
        </button>
    )
}