import React, { PropsWithChildren } from 'react';

export function PageWrapper({children}: PropsWithChildren ) {
    return (
        <div className='max-w-screen-xl mx-auto min-h-screen p-8 text-center flex flex-col items-center' >
            {children}
        </div>
    )
}

export function InputContainer({children}: PropsWithChildren) {
    return (
        <div className='ring-1 ring-slate-300 h-full p-4 mx-4'> 
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